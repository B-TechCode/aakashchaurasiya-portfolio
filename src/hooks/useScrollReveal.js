// hooks/useScrollReveal.js
// Custom hook to detect when elements enter the viewport

import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Returns a ref and a boolean indicating if the element is in view.
 * @param {number} threshold - 0 to 1, how much of the element must be visible
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target) // Animate once
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
