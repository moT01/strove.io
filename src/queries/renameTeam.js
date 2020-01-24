import gql from 'graphql-tag'
import { TeamFragment } from './fragments/team'

export default gql`
    mutation RenameTeam($teamId: ID!, $newName: String){
        renameTeam(teamId:$teamId, newName:$newName){
            ...Team
        }
    }

	${TeamFragment}
`