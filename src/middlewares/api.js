import axios from "axios"
import { API } from "../actions/types"
import { fetchStart, fetch, apiStart, apiEnd } from "state/api/actions"
import { QUERY_START, MUTATION_START } from "src/constants/actions"
import { query, mutate } from "utils"
import client from "../../client"

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action)

  if (action.type !== FETCH_START) return

  const {
    name,
    storeKey = name,
    variables,
    context,
    fetchPolicy = "cache-first",
    errorPolicy = "all",
    query,
    mutation,
    client = client,
  } = action.payload

  if (mutation) {
    dispatch(
      mutate({
        storeKey,
        name,
        storeName,
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
      query({
        storeKey,
        name,
        storeName,
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
