import gql from 'graphql-tag'
import { ProjectFragment } from './project'

export const UserFragment = gql`
  fragment User on User {
    email
    name
    fullName
    photoUrl
    githubUrl
    githubToken
    gitlabUrl
    gitlabToken
    bitbucketUrl
    bitbucketRefreshToken
    bitbucketName
    scopes
    siliskyToken
    currentProjectId
    subscriptionId
    projects {
      ...Project
    }
  }

  ${ProjectFragment}
`
