import gql from 'graphql-tag'
import { ProjectFragment } from './project'
import { TeamFragment } from './team'
import { OrganizationFragment } from './organization'

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
    teams {
      ...Team
    }
    projects {
      ...Project
    }
    organizations {
      ...Organization
    }
  }

  ${ProjectFragment}
  ${TeamFragment}
  ${OrganizationFragment}
`
