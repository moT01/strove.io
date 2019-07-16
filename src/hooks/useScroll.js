import { useRef } from 'react'

export default () => {
  const ref = useRef(null)
  const executeScroll = () => {
    window.scrollTo(0, ref.current.offsetTop)
  }
  const htmlElementAttributes = { ref }

  return [executeScroll, htmlElementAttributes]
}
