import { useEffect, useRef } from 'react'
import ReactGA from 'react-ga'

export default () => {
  const ref = useRef(null)
  useEffect(() => {
    const measurePerformance = performanceEntries => {
      performanceEntries.getEntries().forEach(entry => {
        console.log('entry', entry)
        if (entry.entryType === 'paint') {
          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Paint time',
            value: entry.startTime,
          })
          console.log('Paint', entry.startTime)
        }

        if (entry.entryType === 'navigation') {
          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Server Latency',
            value: entry.responseStart - entry.requestStart,
          })
          console.log(
            'Server Latency',
            entry.responseStart - entry.requestStart
          )

          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Download time',
            value: entry.responseEnd - entry.responseStart,
          })
          console.log('Download time', entry.responseEnd - entry.responseStart)

          ReactGA.timing({
            category: 'Load Performace',
            variable: 'Total load time',
            value: entry.responseEnd - entry.requestStart,
          })
          console.log('Total load time', entry.responseEnd - entry.requestStart)
        }

        if (entry.isIntersecting) {
          ReactGA.event({
            category: 'Scroll',
            action: 'Scrolled',
            value: entry.intersectionRatio,
          })
          console.log('entry.intersectionRatio', entry.intersectionRatio)
        }
      })
    }

    const measureScroll = scrollEntries => {
      scrollEntries.getEntries().forEach(entry => {
        console.log('entry', entry)

        if (entry.isIntersecting) {
          ReactGA.event({
            category: 'Scroll',
            action: 'Scrolled',
            value: entry.intersectionRatio,
          })
          console.log('entry.intersectionRatio', entry.intersectionRatio)
        }
      })
    }
    const perfObserver = new PerformanceObserver(measurePerformance)
    /* https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming */
    perfObserver.observe({ entryTypes: ['paint', 'navigation'] })

    // const scrollObserver = new IntersectionObserver(measureScroll, {
    //   root: null,
    //   rootMargin: '0px',
    //   threshold: 0,
    // })

    // scrollObserver.observe(ref.current)
  }, [])

  return ref
}
