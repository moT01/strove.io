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
    variables,
    context,
    fetchPolicy = !!mutation ? "no-cache" : "cache-first",
    errorPolicy = "all",
    query,
    mutation,
    client = client,
    onSuccess,
    onFailure,
  } = action.payload

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
