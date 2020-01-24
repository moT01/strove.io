import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
  mutation CreateTeam($name: String) {
    createTeam(name: $name) {
      ...Team
    }
  }
  ${TeamFragment}
`
