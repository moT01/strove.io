import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
  mutation ChangePlan($organizationId: ID!, $newPlan: String!) {
    changePlan(organizationId: $organizationId, newPlan: $newPlan)
  }
`
