import window from './window'

export const getWindowPathName = () => window?.location?.pathname

export const getWindowSearchParams = () =>
  new URL(window?.location?.href).searchParams

/*
  Quick fix to make getting repoUrl actually work
  ToDo: Get rid of this insanity and use a decent, sane util that just works
  Note for people wondering what the hell happened:
  newUrl.searchParams is behaving insanely unstable across browsers and sometimes
  returns urls like https:/domain.com instead of https://domian.com if the url is in
  params.
*/
export const getRepoUrl = () => {
  let repoUrl = getWindowSearchParams().get('repoUrl')
  return !repoUrl?.includes('https://')
    ? repoUrl?.slice(0, 7) + repoUrl?.slice(6)
    : repoUrl
}

export const getWindowHref = () => window?.location?.href
