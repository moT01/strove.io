import gql from 'graphql-tag'

export default gql`
  mutation ContinueProject($projectId: ID!, $teamId: ID!) {
    continueProject(projectId: $projectId, teamId: $teamId)
  }
`
