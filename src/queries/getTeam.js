import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
	query GetTeam($teamId: ID!) {
        getTeam(teamId: $teamId){
            ...Team
        }
	}

	${TeamFragment}
`