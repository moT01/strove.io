import gql from 'graphql-tag'

import { UserFragment } from './fragments/user'

export default gql`
  mutation GitlabAuth($code: String!) {
    gitlabAuth(code: $code) {
      ...UserFragment
    }
  }

  ${UserFragment}
`
