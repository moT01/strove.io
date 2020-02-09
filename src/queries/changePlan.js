import gql from 'graphql-tag'

export default gql`
  mutation ChangePlan($organizationId: ID!, $newPlan: String!) {
    changePlan(organizationId: $organizationId, newPlan: $newPlan)
  }
`
