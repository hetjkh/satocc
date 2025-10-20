"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])
  return mouse
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "")
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("")
  const num = parseInt(hex, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

const Particles = ({
  className = "",
  quantity = 100,
  ease = 80,
  color = "#ffffff",
  staticity = 50,
  vx = 0,
  vy = 0,
}: {
  className?: string
  quantity?: number
  ease?: number
  color?: string
  staticity?: number
  vx?: number
  vy?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Array<{ x: number; y: number; translateX: number; translateY: number; size: number; alpha: number; targetAlpha: number; dx: number; dy: number; magnetism: number }>>([])
  const mouse = useMousePosition()
  const mouseRef = useRef({ x: 0, y: 0 })
  const sizeRef = useRef({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const rgb = hexToRgb(color)

  const resizeCanvas = useCallback(() => {
    if (containerRef.current && canvasRef.current && ctx.current) {
      circles.current = []
      sizeRef.current.w = containerRef.current.offsetWidth
      sizeRef.current.h = containerRef.current.offsetHeight
      canvasRef.current.width = sizeRef.current.w * dpr
      canvasRef.current.height = sizeRef.current.h * dpr
      canvasRef.current.style.width = `${sizeRef.current.w}px`
      canvasRef.current.style.height = `${sizeRef.current.h}px`
      ctx.current.scale(dpr, dpr)
    }
  }, [dpr])

  const circleParams = () => {
    const x = Math.random() * sizeRef.current.w
    const y = Math.random() * sizeRef.current.h
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      targetAlpha: Math.random() * 0.8 + 0.2,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      magnetism: 0.1 + Math.random() * 4,
    }
  }

  const drawCircle = (circle: { x: number; y: number; translateX: number; translateY: number; size: number; alpha: number; targetAlpha: number; dx: number; dy: number; magnetism: number }, update = false) => {
    if (!ctx.current) return
    const { x, y, translateX, translateY, size, alpha } = circle
    ctx.current.save()
    ctx.current.translate(translateX, translateY)
    ctx.current.beginPath()
    ctx.current.arc(x, y, size, 0, 2 * Math.PI)
    ctx.current.shadowBlur = 6
    ctx.current.shadowColor = `rgba(${rgb.join(",")}, ${alpha})`
    ctx.current.fillStyle = `rgba(${rgb.join(",")}, ${alpha})`
    ctx.current.fill()
    ctx.current.restore()
    if (!update) circles.current.push(circle)
  }

  const clear = () => ctx.current?.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h)

  const drawParticles = useCallback(() => {
    clear()
    for (let i = 0; i < quantity; i++) drawCircle(circleParams())
  }, [quantity])

  const updateMouse = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      mouseRef.current.x = mouse.x - rect.left - sizeRef.current.w / 2
      mouseRef.current.y = mouse.y - rect.top - sizeRef.current.h / 2
    }
  }, [mouse.x, mouse.y])

  const remap = (v: number, a1: number, b1: number, a2: number, b2: number) =>
    Math.max(((v - a1) * (b2 - a2)) / (b1 - a1) + a2, 0)

  const animate = useCallback(() => {
    clear()
    const time = Date.now() / 1000
    circles.current.forEach((c: { x: number; y: number; translateX: number; translateY: number; size: number; alpha: number; targetAlpha: number; dx: number; dy: number; magnetism: number }, i: number) => {
      const edge = [
        c.x + c.translateX - c.size,
        sizeRef.current.w - c.x - c.translateX - c.size,
        c.y + c.translateY - c.size,
        sizeRef.current.h - c.y - c.translateY - c.size,
      ]
      const closest = Math.min(...edge)
      const factor = parseFloat(remap(closest, 0, 20, 0, 1).toFixed(2))

      // twinkle like a star 🌟
      c.alpha = c.targetAlpha * (0.5 + Math.sin(time * c.twinkleSpeed + c.twinkleOffset) * 0.5)
      c.alpha *= factor

      c.x += c.dx + vx
      c.y += c.dy + vy
      c.translateX += (mouseRef.current.x / (staticity / c.magnetism) - c.translateX) / ease
      c.translateY += (mouseRef.current.y / (staticity / c.magnetism) - c.translateY) / ease
      drawCircle(c, true)

      if (
        c.x < -c.size ||
        c.x > sizeRef.current.w + c.size ||
        c.y < -c.size ||
        c.y > sizeRef.current.h + c.size
      ) {
        circles.current.splice(i, 1)
        drawCircle(circleParams())
      }
    })
    requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (canvasRef.current) ctx.current = canvasRef.current.getContext("2d")
    resizeCanvas()
    drawParticles()
    animate()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [color, resizeCanvas, drawParticles, animate])

  useEffect(() => {
    updateMouse()
  }, [mouse.x, mouse.y, updateMouse])

  return (
    <div ref={containerRef} className={cn("pointer-events-none", className)}>
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}

// 🌌 Main Background Component
export default function Background() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setColor(theme === "light" ? "#000" : "#fff") // light theme = blue stars, dark = white stars
  }, [theme])

  return (
    <div className="fixed z-0 top-0 flex h-[100vh] w-[100vw] flex-col items-center justify-center overflow-hidden bg-transparent pointer-events-none">
      <Particles className="absolute inset-0" quantity={150} ease={80} color={color} />
    </div>
  )
}
