import gql from 'graphql-tag'

export default gql`
  mutation DeleteOrganizatoin($organizationId: String!) {
    deleteOrganization(organizationId: $organizationId)
  }
`
