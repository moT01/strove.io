import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
    mutation RemoveMember($teamId: ID!, $memberId: ID!) {
        removeMember(teamId: $teamId, memberId: $memberId){
            ...Team
        }
    }
    ${TeamFragment}
`