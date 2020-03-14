import gql from 'graphql-tag'
import { UserFragment } from './fragments/project'

// Query to github graph api
export default gql`
  query GetMe {
    me {
      ...UserFragment
    }
  }

  ${UserFragment}
`
