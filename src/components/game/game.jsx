import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import {
  Gltf,
  Environment,
  KeyboardControls, OrbitControls,
} from '@react-three/drei'
import Controller from 'ecctrl'
import { useGameState } from '../../storage/game-state'
import { models } from '../../consts/models'
import { AnimatedModel } from './components/animated-model'

export function Game() {
  const gameState = useGameState()
  const skinOptions = models[gameState.skin]

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
      <Environment files="/env.hdr" ground={{ scale: 100 }} far={100} />
      <directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
      </directionalLight>
      <OrbitControls />
      <ambientLight intensity={0.2} />
      <Physics timeStep="vary" >
        <KeyboardControls map={keyboardMap}>
          <Controller maxVelLimit={4}>
            <AnimatedModel url={skinOptions.path} scale={skinOptions.scale} position={[0, -0.8, 0]} />
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
