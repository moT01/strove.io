import gql from 'graphql-tag'
import { UserFragment } from './fragments/user'

export default gql`
  subscription($deviceId: String) {
    userLogin(deviceId: $deviceId) {
      ...User
    }
  }

  ${UserFragment}
`
