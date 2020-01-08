import gql from 'graphql-tag'

export const TeamFragment = gql`
  fragment Team on Team {
    id
    name
    projects
    owner
    users
  }
`
