import gql from "graphql-tag"

export default gql`
  query GetRepoInfo($owner: String!, $name: String!) {
    getRepoInfo(name: $name) {
      name
      description
      isPrivate
      githubLink
      machineId
    }
  }
`
