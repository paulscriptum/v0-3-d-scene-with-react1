"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, ContactShadows } from "@react-three/drei"
import { Model } from "./model"
import { Suspense, useRef, useState, useEffect } from "react"

function MouseCamera({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree()
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const targetRotationX = useRef(0)
  const targetRotationY = useRef(0)

  const handleMouseMove = (event: MouseEvent) => {
    mouseX.current = (event.clientX / window.innerWidth) * 2 - 1
    mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0]
      mouseX.current = (touch.clientX / window.innerWidth) * 2 - 1
      mouseY.current = -(touch.clientY / window.innerHeight) * 2 + 1
    }
  }

  useFrame(() => {
    const maxAngleX = Math.PI / 18
    const maxAngleY = Math.PI / 18

    targetRotationY.current = mouseX.current * maxAngleX
    targetRotationX.current = mouseY.current * maxAngleY

    const radius = isMobile ? 11 : 5
    const targetX = Math.sin(targetRotationY.current) * radius
    const targetZ = Math.cos(targetRotationY.current) * radius
    const targetY = (isMobile ? 1 : 1) + targetRotationX.current * 2

    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.position.z += (targetZ - camera.position.z) * 0.05

    camera.lookAt(0, isMobile ? -0.5 : 0, 0)
  })

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
  }

  return null
}

export function Scene({ isVisible }: { isVisible: boolean }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const cameraPosition: [number, number, number] = isMobile ? [0, 1, 11] : [0, 1, 5]

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: cameraPosition, fov: 50 }} shadows gl={{ antialias: true }}>
        <color attach="background" args={["#f0f0f0"]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <Suspense fallback={null}>
          <Model isVisible={isVisible} />
          {!isMobile && <ContactShadows position={[0, -1.99, 0]} opacity={0.4} scale={20} blur={0.5} far={4} />}
        </Suspense>

        <Environment preset="city" />

        <MouseCamera isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
