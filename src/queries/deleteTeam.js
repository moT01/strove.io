import gql from 'graphql-tag'

export default gql`
    mutation DeleteTeam($teamId: ID!){
        deleteTeam(teamId: $teamId) 
    }
`