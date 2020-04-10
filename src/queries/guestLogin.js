import gql from 'graphql-tag'

export default gql`
  mutation DeleteGuestLink($deviceId: String!, $guestId: String!) {
    DeleteGuestLink(deviceId: $deviceId, guestId: $guestId)
  }
`
