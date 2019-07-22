import * as C from './constants'

export const fetchStart = createAction(C.FETCH_START, ({ source, config }) => ({
  source,
  config,
}))

export const fetchSuccess = createAction(
  C.FETCH_SUCCESS,
  ({ name, data, code, message }) => ({ data, name, code, message })
)

export const fetchError = createAction(
  C.FETCH_ERROR,
  ({ error, name, code }) => ({ error, name, code })
)

export const removeItem = createAction(C.REMOVE_ITEM, ({ id }) => ({ id }))
