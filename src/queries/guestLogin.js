import gql from 'graphql-tag'

export default gql`
  mutation GuestLogin($deviceId: String!, $guestId: String!) {
    guestLogin(deviceId: $deviceId, guestId: $guestId)
  }
`
