import gql from 'graphql-tag'

export default gql`
  mutation AddProject($tokenId: String!) {
    buySubscription(tokenId: $tokenId)
  }
`
