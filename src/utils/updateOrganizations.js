import { MY_ORGANIZATIONS } from 'queries'

import { query } from './graphql'

export default () => async dispatch =>
  localStorage.getItem('token')
    ? dispatch(
        query({
          name: 'myOrganizations',
          storeKey: 'myOrganizations',
          query: MY_ORGANIZATIONS,
          fetchPolicy: 'network-only',
        })
      )
    : undefined
