import gql from 'graphql-tag'
import { UserFragment } from './fragments/user'

export default gql`
  mutation GithubAuth($code: String!) {
    githubAuth(code: $code) {
      ...User
    }
  }

  ${UserFragment}
`
