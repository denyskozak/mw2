import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'

export function CameraFollow({ target, offset = [1, 2, -5] }) {
  const rig = useRef()
  const camRef = useRef()

  useFrame(() => {
    if (!target?.current || !rig.current) return

    rig.current.position.copy(target.current.position)
    rig.current.quaternion.copy(target.current.quaternion)


    console.log('(target.current.position: ', (target.current.position));
    camRef.current?.lookAt(target.current.position)
  })

  return (
    <group ref={rig}>
      <PerspectiveCamera ref={camRef} makeDefault position={offset} />
    </group>
  );
}
