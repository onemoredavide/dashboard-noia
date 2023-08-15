import { useState, useEffect, useRef } from "react"

export default function useDebounce<T = string>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  const job = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (job.current) {
      clearTimeout(job.current)
    }

    job.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(job.current)
    }
  }, [value, delay])

  return debouncedValue
}
