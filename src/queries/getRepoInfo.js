import gql from "graphql-tag"

export default gql`
  query GetRepoInfo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      primaryLanguage {
        name
        color
      }
    }
  }
`
