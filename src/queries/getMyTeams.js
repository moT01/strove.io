import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

// export default gql`
// 	query getMyTeams {
// 			...Team
// 	}

// 	${TeamFragment}
// `

export default gql`
{ getMyTeams { ...Team } }

${TeamFragment}
`