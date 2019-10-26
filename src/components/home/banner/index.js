import React, { lazy, Suspense } from 'react'
import { window } from 'utils'
import { useInterval } from 'hooks'

const A = lazy(() => import('./a'))
const B = lazy(() => import('./b'))

const checkGoogleOptimizeLoading = () => {
  if (window?.google_optimize !== undefined) {
    const variant = window.google_optimize.get(process.env.GOOGLE_OPTIMIZE_ID)
  }
}

export default props => {
  useInterval(checkGoogleOptimizeLoading, window?.google_optimize ? 100 : null)

  const searchParams = new URL(window?.location?.href).searchParams
  const feature = searchParams?.get('feature') || ''

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {feature.includes('b') ? <B {...props} /> : <A {...props} />}
    </Suspense>
  )
}
