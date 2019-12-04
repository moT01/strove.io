import gql from 'graphql-tag'

export default gql`
  mutation BitbucketAuth($code: String!, $deviceId: String!) {
    bitbucketAuth(code: $code, deviceId: $deviceId)
  }
`
