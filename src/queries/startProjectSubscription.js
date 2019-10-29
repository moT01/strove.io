import gql from 'graphql-tag'
import { ProjectFragment } from './fragments/project'

export default gql`
  subscription($email: String!) {
    startProject(email: $email) {
      queuePosition
      project {
        ...Project
      }
    }
  }
  ${ProjectFragment}
`
