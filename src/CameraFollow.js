import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

export default function CameraFollow({ target, offset = [1, 2, -4] }) {
  const rig = useRef()
  const camRef = useRef()

  useFrame(() => {
    if (!target?.current || !rig.current) return

    rig.current.position.copy(target.current.position)
    rig.current.quaternion.copy(target.current.quaternion)

    camRef.current?.lookAt(target.current.position)
  })

  return (
    <group ref={rig}>
      <PerspectiveCamera ref={camRef} makeDefault position={offset} />
    </group>
  )
}
