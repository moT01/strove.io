import * as C from './constants'

export const fetchStart = ({ source, config }) => ({
  type: C.FETCH_START,
  payload: { source, config },
})

export const fetchSuccess = ({ name, data, code, message }) => ({
  type: C.FETCH_SUCCESS,
  payload: { data, name, code, message },
})

export const fetchError = ({ error, name, code }) => ({
  type: C.FETCH_ERROR,
  payload: { error, name, code },
})

export const removeItem = ({ id }) => ({ type: C.REMOVE_ITEM, payload: { id } })
