import gql from 'graphql-tag'

export default gql`
  mutation StopLiveShare($projectId: ID!) {
    stopLiveShare(projectId: $projectId)
  }
`
