export default repoLink => {
  const repoUrlParts = repoLink.split('/')
  let repoProvider = repoUrlParts[2].split('.')[0]
  if (repoProvider.length > 6) {
    repoProvider = repoProvider.split('@')[1]
  }
  return repoProvider
}
