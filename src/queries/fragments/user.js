import gql from 'graphql-tag'
import { ProjectFragment } from './project'
import { SubscriptionFragment } from './subscription'
import { TeamFragment } from './team'

export const UserFragment = gql`
  fragment User on User {
    id
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
    token
    siliskyToken
    token
    currentProjectId
    subscriptionId
    teams {
      ...Team
    }
    projects {
      ...Project
    }
  }

  ${ProjectFragment}
  ${TeamFragment}
`
