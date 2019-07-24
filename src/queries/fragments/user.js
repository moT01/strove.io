import gql from 'graphql-tag'

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
    scopes
    siliskyToken
    currentProjectId
  }
`
