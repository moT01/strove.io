import gql from 'graphql-tag'
import { ProjectFragment } from './project'
import { SubscriptionFragment } from './subscription'

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
    scopes
    siliskyToken
    currentProjectId
    subscription {
      ...Subscription
    }
    projects {
      ...Project
    }
  }

  ${ProjectFragment}
  ${SubscriptionFragment}
`
