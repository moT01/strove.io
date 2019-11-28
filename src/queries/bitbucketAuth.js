import gql from 'graphql-tag'
import { UserFragment } from './fragments/user'

export default gql`
  mutation BitbucketAuth($code: String!, $deviceId: String!) {
    bitbucketAuth(code: $code, deviceId: $deviceId)
  }
`
