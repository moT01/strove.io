import gql from 'graphql-tag'
import { ProjectFragment } from '../fragments/project'

export const TeamFragment = gql`
  fragment Team on Team {
    id
    name
    organizationId
    projects {
      ...Project
    }
    teamLeader {
      id
      name
      photoUrl
      email
    }
    users {
      name
      photoUrl
      id
      email
      type
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
