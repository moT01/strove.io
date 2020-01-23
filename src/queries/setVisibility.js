import gql from 'graphql-tag'
import { ProjectFragment } from './fragments/project'

export default gql`
  mutation SetVisibility($projectId: ID!, $isVisible: Boolean!) {
    setVisibility(projectId: $projectId, isVisible: $isVisible) {
      ...Project
    }
  }
  ${ProjectFragment}
`
