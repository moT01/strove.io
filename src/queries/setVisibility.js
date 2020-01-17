import gql from 'graphql-tag'
import { ProjectFragment } from './fragments/project'

export default gql`
    mutation SetVisibility($teamId: ID!) {
        setVisibility(teamId: $teamId){
            ...Project
        }
        ${ProjectFragment}
    }
`
