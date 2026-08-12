'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Counts up to `end` once the element enters the viewport.
 * Respects prefers-reduced-motion by jumping straight to the value.
 */
export function useCountUp(end: number, duration = 1400) {
  const ref = useRef<HTMLElement | null>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || typeof IntersectionObserver === 'undefined') {
      setValue(end)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              setValue(Math.round(eased * end))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return { ref, value }
}
