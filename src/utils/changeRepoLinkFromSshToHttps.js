export default link => {
  let repoLink = link
  // git@github.com:stroveio/strove.io.git
  // https://github.com/stroveio/strove.io.git
  if (repoLink.includes('git@github')) {
    const sshLinkParts = repoLink.split(':')
    repoLink = `https://github.com/${sshLinkParts[1]}`
  }

  // git@gitlab.com:stroveio/strove.io.git
  // https://gitlab.com/stroveio/strove.io.git
  if (repoLink.includes('git@gitlab')) {
    const sshLinkParts = repoLink.split(':')
    repoLink = `https://gitlab.com/${sshLinkParts[1]}`
  }

  // git@bitbucket.org:stroveio/strove.io.git
  // https://stroveio@bitbucket.org/stroveio/stroveio.io.git
  if (repoLink.includes('git@bitbucket')) {
    const sshLinkParts = repoLink.split(':')
    const repoDetails = sshLinkParts[1].split('/')
    const accountName = repoDetails[0]
    const repoName = repoDetails[1]
    repoLink = `https://gitlab.com/${sshLinkParts[1]}`
    repoLink = `https://${accountName}@bitbucket.org/${accountName}/${repoName}`
  }

  return repoLink.replace('.git', '') // ToDo: Decide if this replac stays .replace('.git', '')
}
