import gql from 'graphql-tag'

export default gql`
  mutation GithubAuth($code: String!) {
    githubAuth(code: $code) {
      email
      name
      fullName
      photoUrl
      githubUrl
      githubToken
      gitlabUrl
      gitlabToken
      scopes
      siliskyToken
    }
  }
`
