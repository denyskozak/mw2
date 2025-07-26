import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import {
  Gltf,
  Environment,
  KeyboardControls,
  Stats,
} from '@react-three/drei'
import Controller from 'ecctrl'
import { useGameState } from '../../storage/game-state.js'
import { models } from '../../consts/models.js'
import { AnimatedModel } from './components/animated-model.jsx'

import Projectile from '../projectile.jsx'
import { Suspense, useRef, useState } from 'react'
import { Interface } from './interface/Interface.jsx'

function ResetOnFall({ playerRef, threshold = -5, resetPosition = [0, 2, 0] }) {
  useFrame(() => {
    const obj = playerRef.current
    if (!obj) return
    if (obj.position.y < threshold) {
      obj.position.set(...resetPosition)
    }
  })
  return null
}


export function Game({ matchId = null }) {
  const gameState = useGameState()
  const skinOptions = models[gameState.skin]
  const [projectiles, setProjectiles] = useState([])
  const playerRef = useRef()

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
        <Suspense fallback={null}>
          <Environment files="/env.hdr" ground={{ scale: 100 }} far={100} />
          <directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
            <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
          </directionalLight>
          <ambientLight intensity={0.2} />
          <Physics timeStep="vary">
            <ResetOnFall playerRef={playerRef} />
            <KeyboardControls map={keyboardMap}>
              <Controller maxVelLimit={4} camTargetPos={{ x: -0.5, y: 0.8, z: 0 }}>
                <AnimatedModel position={[0, -0.9, 0]} ref={playerRef} url={skinOptions.path} scale={skinOptions.scale}
                               onCast={handleCast} />
              </Controller>
            </KeyboardControls>
            {/*{projectiles.map((p) => (*/}
            {/*  <Projectile*/}
            {/*    key={p.id}*/}
            {/*    start={p.pos}*/}
            {/*    direction={p.dir}*/}
            {/*    onFinish={() =>*/}
            {/*      setProjectiles((s) => s.filter((pr) => pr.id !== p.id))*/}
            {/*    }*/}
            {/*  />*/}
            {/*))}*/}
            <RigidBody type="fixed" colliders="trimesh">
              <Gltf castShadow receiveShadow scale={1} src="/models/zone-fantasy-2.glb" />
              {/*<Gltf castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={0.11} src="/fantasy_game_inn2-transformed.glb" />*/}
            </RigidBody>
          </Physics>
          <Stats />
        </Suspense>
      </Canvas>


  )
}
