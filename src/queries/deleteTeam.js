import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
    mutation DeleteTeam($teamId: ID!){
        deleteTeam(teamId: $teamId) {
            ...Team
        }
        ${TeamFragment}
    }
`