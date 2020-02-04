import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
  mutation CreateTeam($name: String, $organizationId: ID) {
    createTeam(name: $name, organizationId: $organizationId) {
      ...Team
    }
  }
  ${TeamFragment}
`
