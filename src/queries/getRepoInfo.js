import gql from 'graphql-tag'

// Query to github graph api
export default gql`
  query GetRepoInfo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      isPrivate
      primaryLanguage {
        name
        color
      }
    }
  }
`
