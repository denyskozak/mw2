import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import {
  Gltf,
  Environment,
  KeyboardControls,
  useGLTF,
  useAnimations,
  useKeyboardControls,
} from '@react-three/drei'
import Controller from 'ecctrl'
import { useGameState } from './storage/game-state'
import { models } from './consts/models'
import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import Projectile from './Projectile'
import characterSkillMap from './maps/character-skill-map.json'

const mapKeys = (map, origin) => Object.entries(map).reduce((acc, [key, value]) => {

  return {...acc, [key]: origin[value] }
}, {})

function AnimatedModel({ url, scale, onCast }) {
  const { scene, animations } = useGLTF(url)

  const { actions: originActions, ref } = useAnimations(animations)
  const [actions, setActions] = useState({})
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { camera, scene: threeScene } = useThree()
  const castingRef = useRef(false)

  useEffect(() => {
    actions?.idle?.play()
  }, [actions])

  useEffect(() => {
    setActions( mapKeys(characterSkillMap['brand'], originActions))
  }, [ref.current])

  useFrame(() => {
    const { forward, backward, leftward, rightward, cast } = getKeys()
    const moving = forward || backward || leftward || rightward

    if (cast) {
      if (!castingRef.current) {
        castingRef.current = true
        if (onCast && ref.current) {
          const pos = ref.current.getWorldPosition(new THREE.Vector3())
          const raycaster = new THREE.Raycaster()
          raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
          const intersects = raycaster.intersectObjects(threeScene.children, true)
          let target
          if (intersects.length > 0) {
            target = intersects[0].point
          } else {
            target = camera
              .getWorldDirection(new THREE.Vector3())
              .multiplyScalar(1000)
              .add(camera.position)
          }
          const dir = target.clone().sub(pos).normalize()
          onCast(pos, dir)
        }
      }
      if (actions?.casting && !actions?.casting.isRunning()) {
        Object.values(actions).forEach((a) => a?.stop())
        actions?.casting.play()
      }

    } else if (moving && actions?.walk) {
      castingRef.current = false
      if (!actions?.walk.isRunning()) {
        Object.values(actions).forEach((a) => a?.stop())
        actions?.walk.reset().play()
      }
    } else {
      castingRef.current = false
      if (!actions?.idle?.isRunning()) {
        Object.values(actions).forEach((a) => a?.stop())
        actions?.idle?.play()
      }
    }
  })

  return <primitive ref={ref} object={scene} scale={scale} />
}

export default function App() {
  const gameState = useGameState();
  const skinOptions = models[gameState.skin];
  const [projectiles, setProjectiles] = useState([])

  const handleCast = (pos, dir) => {
    setProjectiles((p) => [...p, { id: Date.now() + Math.random(), pos, dir }])
  }

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
    { name: 'cast', keys: ['KeyE'] },
  ]

  return (
    <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}>
      {/*<Fisheye zoom={0.4}>*/}
        <Environment files="/env.hdr" ground={{ scale: 100 }} far={100}/>
        <directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
          <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
        </directionalLight>
        <ambientLight intensity={0.2} />
        <Physics timeStep="vary">
          <KeyboardControls map={keyboardMap}>
            <Controller maxVelLimit={5}>
              <AnimatedModel url={skinOptions.path} scale={skinOptions.scale} onCast={handleCast} />
            </Controller>
          </KeyboardControls>
          {projectiles.map((p) => (
            <Projectile
              key={p.id}
              start={p.pos}
              direction={p.dir}
              onFinish={() =>
                setProjectiles((s) => s.filter((pr) => pr.id !== p.id))
              }
            />
          ))}
          <RigidBody type="fixed" colliders="trimesh">
            <Gltf castShadow receiveShadow scale={1} src="/models/zone-fantasy-2.glb" />
            {/*<Gltf castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={0.11} src="/fantasy_game_inn2-transformed.glb" />*/}
          </RigidBody>
        </Physics>
      {/*</Fisheye>*/}
    </Canvas>
  )
}
