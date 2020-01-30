import gql from 'graphql-tag'

export default gql`
  mutation ChangePaymentInfo($paymentMethod: String!) {
    changePaymentInfo(paymentMethod: $paymentMethod)
  }
`
