import gql from 'graphql-tag'

export default gql`
  mutation GitlabAuth($isOnboarded: Boolean!) {
    setOnboarded(isOnboarded: $isOnboarded)
  }
`
