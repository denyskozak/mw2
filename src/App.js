import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import {
  Gltf,
  Environment,
  Fisheye,
  KeyboardControls,
  useGLTF,
  useAnimations,
  useKeyboardControls,
} from '@react-three/drei'
import Controller from 'ecctrl'
import { useGameState } from './storage/game-state'
import { models } from './consts/models'
import { useEffect, useRef } from 'react'

function AnimatedModel({ url, scale }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)
  const [subscribeKeys, getKeys] = useKeyboardControls()

  useEffect(() => {
    actions.idle?.play()
  }, [actions])

  useFrame(() => {
    const { forward, backward, leftward, rightward, cast } = getKeys()
    const moving = forward || backward || leftward || rightward

    if (cast && actions.casting) {
      Object.values(actions).forEach((a) => a.stop())
      actions.casting.reset().play()
    } else if (moving && actions.walk) {
      if (!actions.walk.isRunning()) {
        Object.values(actions).forEach((a) => a.stop())
        actions.walk.reset().play()
      }
    } else {
      if (!actions.idle?.isRunning()) {
        Object.values(actions).forEach((a) => a.stop())
        actions.idle?.play()
      }
    }
  })

  return <primitive ref={group} object={scene} scale={scale} />
}

export default function App() {
  const gameState = useGameState();
  const skinOptions = models[gameState.skin];

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
              <AnimatedModel url={skinOptions.path} scale={skinOptions.scale} />
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
