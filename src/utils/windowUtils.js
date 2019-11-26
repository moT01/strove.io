import window from './window'

export const getWindowPathName = () => window?.location?.pathname

export const getWindowSearchParams = () =>
  new URL(window?.location?.href).searchParams

export const getRepoUrl = () => {
  let repoUrl = getWindowSearchParams().get('repoUrl')
  return !repoUrl.includes('https://')
    ? repoUrl.slice(0, 7) + repoUrl.slice(6)
    : repoUrl
}

export const getWindowHref = () => window?.location?.href
