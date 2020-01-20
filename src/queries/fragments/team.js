import gql from 'graphql-tag'
import { ProjectFragment } from '../fragments/project'

export const TeamFragment = gql`
  fragment Team on Team {
    id
    name
    projects {
      ...Project
    }
    owner {
      id
      name
      photoUrl
    }
    users {
      name
      photoUrl
      id
    }
    invited {
      name
      id
      email
      photoUrl
    }
  }
  ${ProjectFragment}
`
