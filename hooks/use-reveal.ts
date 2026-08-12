'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Adds an `is-visible` class once the element scrolls into view.
 * Pair with the `.reveal` utility in globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, visible }
}
