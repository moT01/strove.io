import React, { lazy, Suspense, memo } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from 'state'

const A = lazy(() => import('./a'))
const B = lazy(() => import('./b'))

export default memo(props => {
  const feature = useSelector(selectors.feature.getFeature)
  console.log('feature', feature)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {feature.includes('b') ? <B {...props} /> : <A {...props} />}
    </Suspense>
  )
})
