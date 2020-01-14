import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
  query MyTeams {
    myTeams {
      ...Team
    }
  }

  ${TeamFragment}
`
