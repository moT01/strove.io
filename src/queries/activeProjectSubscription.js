import gql from 'graphql-tag'
import { ProjectFragment } from './fragments/project'

export default gql`
  subscription {
    ...Project
  }
  ${ProjectFragment}
`
