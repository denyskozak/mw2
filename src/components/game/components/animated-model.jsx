import * as THREE from 'three'
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { remapObjectKeys } from '../../../utilities/remap-object-keys.js'
import characterSkillMap from '../../../maps/character-skill-map.json'

export const AnimatedModel = forwardRef(({ url, scale, position, onCast }, modelRef) => {
  const { scene, animations } = useGLTF(url)

  const { actions: originActions, ref } = useAnimations(animations)
  const [actions, setActions] = useState({})
  const [subscribeKeys, getKeys] = useKeyboardControls()
  const { camera, scene: threeScene } = useThree()
  const castingRef = useRef(false)

  useEffect(() => {
    actions?.idle?.play()
  }, [actions])

  useEffect(() => {
    setActions(remapObjectKeys(characterSkillMap['brand'], originActions))
  }, [ref.current])

  useEffect(() => {
    if (modelRef) {
      modelRef.current = ref.current
    }
  }, [modelRef, ref])

  useFrame(() => {
    const { forward, backward, leftward, rightward, cast } = getKeys()
    const moving = forward || backward || leftward || rightward

    if (cast) {
      // if (!castingRef.current) {
      //   castingRef.current = true
      //   if (onCast && ref.current) {
      //     const pos = ref.current.getWorldPosition(new THREE.Vector3())
      //     const raycaster = new THREE.Raycaster()
      //     raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
      //     const intersects = raycaster.intersectObjects(threeScene.children, true)
      //     let target
      //     if (intersects.length > 0) {
      //       target = intersects[0].point
      //     } else {
      //       target = camera
      //         .getWorldDirection(new THREE.Vector3())
      //         .multiplyScalar(1000)
      //         .add(camera.position)
      //     }
      //     const dir = target.clone().sub(pos).normalize()
      //     onCast(pos, dir)
      //   }
      // }
      if (actions?.casting && !actions?.casting.isRunning()) {
        Object.values(actions).forEach((a) => a?.stop())
        actions?.casting.play();
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
});
