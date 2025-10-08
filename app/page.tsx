"use client"

import { Scene } from "@/components/scene"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (triggerRef.current) {
      observer.observe(triggerRef.current)
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current)
      }
    }
  }, [])

  return (
    <main className="relative w-full min-h-[150vh]">
      <div className="fixed inset-0 pointer-events-none">
        <Scene isVisible={isVisible} />
      </div>
      <div ref={triggerRef} className="absolute top-[30vh] w-full h-px" />
    </main>
  )
}
