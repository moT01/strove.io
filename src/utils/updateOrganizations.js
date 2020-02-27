import { MY_ORGANIZATIONS } from 'queries'

import { query } from './graphql'

export default ({ onSuccess = () => null } = {}) => dispatch => {
  const token = localStorage.getItem('token')
  console.log('TCL: onSuccess', onSuccess)
  if (token) {
    console.log('TCL: onSuccess', onSuccess)
    dispatch(
      query({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
            'User-Agent': 'node',
          },
        },
        name: 'myOrganizations',
        storeKey: 'myOrganizations',
        query: MY_ORGANIZATIONS,
        fetchPolicy: 'network-only',
        onSuccess: data => onSuccess(data),
      })
    )
  }
  return undefined
}
