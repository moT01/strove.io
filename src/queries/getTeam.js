import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
	query GetTeam($teamID: ID!) {
        getTeam(teamID: $teamID){
            ...Team
        }
	}

	${TeamFragment}
`