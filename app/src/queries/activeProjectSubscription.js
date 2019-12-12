import gql from 'graphql-tag'
import { ProjectFragment } from './fragments/project'

export default gql`
  subscription($email: String!) {
    activeProject(email: $email) {
      ...Project
    }
  }
  ${ProjectFragment}
`
