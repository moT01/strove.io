import client from "../../client"

export const mutate = ({
  mutationName,
  storeName,
  variables,
  context,
  errorPolicy = "all",
  mutation,
}) => {
  return async dispatch => {
    dispatch({
      type: `FETCH/${storeName.toUpperCase()}/LOADING`,
      payload: true,
    })

    try {
      const { data } = await client.mutate({
        mutation,
        context,
        variables,
        fetchPolicy: "no-cache",
        errorPolicy,
      })

      dispatch({
        type: `FETCH/${storeName.toUpperCase()}/DATA`,
        payload: data[mutationName],
      })
    } catch (e) {
      console.log("fetch error: ", e)
      dispatch({ type: `FETCH/${storeName.toUpperCase()}/ERROR`, payload: e })
    }
  }
}

export const query = ({
  queryName,
  storeName,
  variables,
  context,
  fetchPolicy = "cache-first",
  errorPolicy = "all",
  query,
}) => {
  return async dispatch => {
    dispatch({
      type: `FETCH/${storeName.toUpperCase()}/LOADING`,
      payload: true,
    })

    try {
      const { data } = await client.query({
        query,
        context,
        variables,
        fetchPolicy,
        errorPolicy,
      })

      dispatch({
        type: `FETCH/${storeName.toUpperCase()}/DATA`,
        payload: data[queryName],
      })
    } catch (e) {
      console.log("fetch error: ", e)
      dispatch({ type: `FETCH/${storeName.toUpperCase()}/ERROR`, payload: e })
    }
  }
}
