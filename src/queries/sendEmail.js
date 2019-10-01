import gql from 'graphql-tag'

export default gql`
  mutation SendEmail(
    $email: String!
    $isDemo: Boolean
    $isNewsletter: Boolean
  ) {
    sendEmail(email: $email, isDemo: $isDemo, isNewsletter: $isNewsletter) {
      email
    }
  }
`
