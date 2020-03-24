import { MY_ORGANIZATIONS } from 'queries'

import { query } from './graphql'

export default ({ onSuccess = () => null } = {}) => dispatch => {
  const token = localStorage.getItem('token')
  if (token) {
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
        allowRepeated: false,
      })
    )
  }
  return undefined
}
