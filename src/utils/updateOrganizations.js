import { MY_ORGANIZATIONS } from 'queries'

import { query } from './graphql'

export default () =>
  localStorage.getItem('token') &&
  query({
    name: 'myOrganizations',
    storeKey: 'myOrganizations',
    query: MY_ORGANIZATIONS,
    fetchPolicy: 'network-only',
  })
