import gql from 'graphql-tag'

export const SubscriptionFragment = gql`
  fragment Subscription on PaidSubscription {
    id
    subscriptionId
    current_period_start
    current_period_end
    canceled_at
    customer
    discount
    latest_invoice
    start
    status
    tax_percent
    subscription_type
    projects_limit
    virtualMachineId
  }
`
