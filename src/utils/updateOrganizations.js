import { MY_ORGANIZATIONS } from 'queries'

import { query } from './graphql'

export default dispatch =>
  dispatch(
    query({
      name: 'myOrganizations',
      storeKey: 'myOrganizations',
      query: MY_ORGANIZATIONS,
    })
  )
