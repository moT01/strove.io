import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options,
    })
    ReactGA.pageview(page)
  }

  const HOC = props => {
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
        var observer = new PerformanceObserver(callback)
        observer.observe({ entryTypes: ['paint'] })
      }
    }, [])

    useEffect(() => trackPage(props.location.pathname), [
      props.location.pathname,
    ])

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default withTracker
