import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
	query GetMyTeams { getMyTeams {
		...Team
		}
	}

	${TeamFragment}
	`