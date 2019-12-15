import gql from 'graphql-tag'

export default gql`
  mutation GitlabAuth($code: String!, $deviceId: String!) {
    gitlabAuth(code: $code, deviceId: $deviceId)
  }
`
