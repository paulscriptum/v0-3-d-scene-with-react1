"use client"

import { Scene } from "@/components/scene"
import { useState, useEffect } from "react"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 500
      const progress = Math.min(scrollY / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  return (
    <main className={`relative w-full ${isMobile ? "h-screen" : "h-[200vh]"}`}>
      <div className="fixed inset-0">
        <Scene scrollProgress={isMobile ? 1 : scrollProgress} />
      </div>
    </main>
  )
}
