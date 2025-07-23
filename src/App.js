import { Canvas, useFrame } from '@react-three/fiber'
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
import { useEffect, useState, useRef, forwardRef } from 'react'
import CameraFollow from './CameraFollow'
import characterSkillMap from './maps/character-skill-map.json'

const mapKeys = (map, origin) => Object.entries(map).reduce((acc, [key, value]) => {

  return {...acc, [key]: origin[value] }
}, {})

const AnimatedModel = forwardRef(function AnimatedModel({ url, scale }, modelRef) {
  const { scene, animations } = useGLTF(url)

  const { actions: originActions, ref } = useAnimations(animations)
  const [actions, setActions] = useState({})
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useEffect(() => {
    actions?.idle?.play()
  }, [actions])

  useEffect(() => {
    setActions( mapKeys(characterSkillMap['brand'], originActions))
  }, [ref.current])

  useFrame(() => {
    const { forward, backward, leftward, rightward, cast } = getKeys()
    const moving = forward || backward || leftward || rightward

    if (cast && actions?.casting) {
      if (!actions?.casting.isRunning()) {
        Object.values(actions).forEach((a) => a?.stop())
        actions?.casting.play()
      }

    } else if (moving && actions?.walk) {
      if (!actions?.walk.isRunning()) {
        Object.values(actions).forEach((a) => a?.stop())
        actions?.walk.reset().play()
      }
    } else {
      if (!actions?.idle?.isRunning()) {
        Object.values(actions).forEach((a) => a?.stop())
        actions?.idle?.play()
      }
    }
  })

  useEffect(() => {
    if (modelRef) {
      modelRef.current = ref.current
    }
  }, [modelRef, ref])

  return <primitive ref={ref} object={scene} scale={scale} />
})

export default function App() {
  const gameState = useGameState();
  const skinOptions = models[gameState.skin];
  const playerRef = useRef();

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
              <AnimatedModel ref={playerRef} url={skinOptions.path} scale={skinOptions.scale} />
              <CameraFollow target={playerRef} />
            </Controller>
          </KeyboardControls>
          <RigidBody type="fixed" colliders="trimesh">
            <Gltf castShadow receiveShadow scale={1} src="/models/zone-fantasy-2.glb" />
            {/*<Gltf castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={0.11} src="/fantasy_game_inn2-transformed.glb" />*/}
          </RigidBody>
        </Physics>
      {/*</Fisheye>*/}
    </Canvas>
  )
}
