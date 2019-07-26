import gql from 'graphql-tag'

export default gql`
  mutation ResetCron($projectId: ID!) {
    resetCron(projectId: $projectId)
  }
`
