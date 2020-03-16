import gql from 'graphql-tag'
import { UserFragment } from './fragments/user'

export default gql`
  mutation GitlabAuth($isOnboarded: Boolean!) {
    setOnboarded(isOnboarded: $isOnboarded) {
      ...User
    }
  }

  ${UserFragment}
`
