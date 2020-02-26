import { MY_ORGANIZATIONS } from 'queries'
import { useDispatch } from 'react-redux'

import { query } from './graphql'

export default ({ onSuccess = () => null }) =>
  localStorage.getItem('token')
    ? useDispatch(
        query({
          name: 'myOrganizations',
          storeKey: 'myOrganizations',
          query: MY_ORGANIZATIONS,
          fetchPolicy: 'network-only',
          onSuccess: data => onSuccess(data),
        })
      )
    : undefined
