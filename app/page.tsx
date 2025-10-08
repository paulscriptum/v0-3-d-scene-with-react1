"use client"

import { Scene } from "@/components/scene"
import { useState, useEffect } from "react"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 500
      const progress = Math.min(scrollY / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative w-full h-[200vh]">
      <div className="fixed inset-0">
        <Scene scrollProgress={scrollProgress} />
      </div>
    </main>
  )
}
