// hooks/useTypewriter.js
// Cycles through an array of strings with a typewriter effect

import { useEffect, useState } from 'react'

/**
 * useTypewriter
 * @param {string[]} words - Array of strings to cycle through
 * @param {number} typeSpeed - ms per character when typing
 * @param {number} deleteSpeed - ms per character when deleting
 * @param {number} pauseTime - ms to pause before deleting
 */
export function useTypewriter(words, typeSpeed = 80, deleteSpeed = 50, pauseTime = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayed(current.slice(0, displayed.length + 1))
        if (displayed.length + 1 === current.length) {
          // Finished typing — pause then delete
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        // Deleting
        setDisplayed(current.slice(0, displayed.length - 1))
        if (displayed.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime])

  return displayed
}
