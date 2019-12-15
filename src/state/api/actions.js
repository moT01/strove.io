import * as C from './consts'

export const fetchStart = ({ storeKey, source, config }) => ({
  type: C.FETCH_START,
  payload: { storeKey, source, config },
})

export const fetchSuccess = ({ storeKey, data, code, message }) => ({
  type: C.FETCH_SUCCESS,
  payload: { data, storeKey, code, message },
})

export const fetchError = ({ storeKey, error, code }) => ({
  type: C.FETCH_ERROR,
  payload: { error, storeKey, code },
})

export const removeItem = ({ id, storeKey }) => ({
  type: C.REMOVE_ITEM,
  payload: { id, storeKey },
})

export const updateItem = ({ storeKey, id, data, message, code }) => ({
  type: C.UPDATE_ITEM,
  payload: { storeKey, id, data, message, code },
})
