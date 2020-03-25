import gql from 'graphql-tag'

export default gql`
  mutation StartLiveShare($projectId: ID!, $teamId: ID!) {
    startLiveShare(projectId: $projectId, teamId: $teamId)
  }
`
