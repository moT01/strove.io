import React, { useEffect, useRef } from 'react'
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
    const intersectTarget = useRef(null)

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
              category: 'Scroll',
              action: 'Scrolled to heading 2',
              value: entry.intersectionRatio,
            })
          }
        })
      }
      const observerScroll = new IntersectionObserver(callback, opts)

      observerScroll.observe(intersectTarget.current)
    }, [])

    useEffect(() => trackPage(props.location.pathname), [
      props.location.pathname,
    ])

    return <WrappedComponent ref={intersectTarget} {...props} />
  }

  return HOC
}

export default withTracker
