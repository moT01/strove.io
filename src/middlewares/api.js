import { Query, Mutation } from 'utils'
// import { FETCH_START } from 'state/api/constants'
import client from '../../client'

const apiMiddleware = ({ dispatch }) => next => action => {
  console.log('action', action)
  next(action)

  if (action.type !== 'FETCH_START') return

  console.log('action.type !== FETCH_START')

  const {
    name,
    storeKey = name,
    variables,
    context,
    fetchPolicy = 'cache-first',
    errorPolicy = 'all',
    query,
    mutation,
    onSuccess,
    onFailure,
    client = client,
  } = action.payload

  if (mutation) {
    dispatch(
      Mutation({
        storeKey,
        name,
        variables,
        context,
        errorPolicy,
        mutation,
        onSuccess,
        onFailure,
      })
    )
  } else {
    dispatch(
      Query({
        storeKey,
        name,
        variables,
        context,
        fetchPolicy,
        errorPolicy,
        query,
        onSuccess,
        onFailure,
      })
    )
  }

  // dispatch(apiStart(label))

  // axios
  //   .request({
  //     url,
  //     method,
  //     headers,
  //     [dataOrParams]: data,
  //   })
  //   .then(({ data }) => {
  //     dispatch(onSuccess(data))
  //   })
  //   .catch(error => {
  //     dispatch(apiError(error))
  //     dispatch(onFailure(error))

  //     if (error.response && error.response.status === 403) {
  //       dispatch(accessDenied(window.location.pathname))
  //     }
  //   })
  //   .finally(() => {
  //     if (label) {
  //       dispatch(apiEnd(label))
  //     }
  //   })
}

export default apiMiddleware
