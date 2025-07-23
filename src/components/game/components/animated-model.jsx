import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { remapObjectKeys } from '../../../utilities/remap-object-keys'
import characterSkillMap from '../../../maps/character-skill-map.json'

export function AnimatedModel({ url, scale, position }) {
  const { scene, animations } = useGLTF(url)

  const { actions: originActions, ref } = useAnimations(animations)
  const [actions, setActions] = useState({})
  const [, getKeys] = useKeyboardControls()

  useEffect(() => {
    actions?.idle?.play()
  }, [actions])

  useEffect(() => {
    // remap a model animtion names
    if (ref.current) {
      setActions(remapObjectKeys(characterSkillMap['brand'], originActions))
    }
  }, [ref.current])

  useFrame(() => {
    // implement movemnt for model
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

  return <primitive ref={ref} position={position} object={scene} scale={scale} />
}