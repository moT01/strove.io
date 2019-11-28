import gql from 'graphql-tag'

export default gql`
  mutation GithubAuth($code: String!, $deviceId: String!) {
    githubAuth(code: $code, deviceId: $deviceId)
  }
`
