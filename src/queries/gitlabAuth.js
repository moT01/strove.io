import gql from 'graphql-tag'

export default gql`
  mutation GitlabAuth($code: String!) {
    gitlabAuth(code: $code) {
      email
      name
      fullName
      photoUrl
      gitlabUrl
      gitlabToken
      siliskyToken
    }
  }
`
