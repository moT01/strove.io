import { useEffect, useRef } from 'react'
import ReactGA from 'react-ga'

/* Handle clearing interval */
export default () => {
  const ref = useRef()
  useEffect(() => {
    const opts = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }
    const callback = list => {
      list.forEach(entry => {
        if (entry.isIntersecting) {
          ReactGA.event({
            category: 'Rendering',
            variable: entry.name,
            value: entry.startTime,
          })
        }
        console.log('entry.intersectionRatio', entry.startTime)
      })
      const observer = new PerformanceObserver(callback)
      observer.observe({ entryTypes: ['paint'] })
    }
  }, [])

  return ref
}
