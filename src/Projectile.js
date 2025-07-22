import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Projectile({ start, direction, onFinish }) {
  const ref = useRef()
  const startRef = useRef(start.clone())
  const dirRef = useRef(direction.clone().normalize())

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.add(dirRef.current.clone().multiplyScalar(0.5))
    if (ref.current.position.distanceTo(startRef.current) > 50) {
      onFinish?.()
    }
  })

  return (
    <mesh ref={ref} position={startRef.current} castShadow>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
