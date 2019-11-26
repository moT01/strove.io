import window from './window'

export const getWindowPathName = () => window?.location?.pathname

export const getWindowSearchParams = () =>
  new URL(window?.location?.href).searchParams

export const getRepoUrl = () => getWindowSearchParams().get('repoUrl')

export const getWindowHref = () => window?.location?.href
