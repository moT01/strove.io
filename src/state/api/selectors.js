import getOr from 'lodash/fp/getOr'

/* Rest is used to get data from nested objects */
export const getData = (dataKey, defaultValue = {}, ...rest) =>
  getOr(defaultValue, ['api', dataKey, 'data', ...rest])

export const getError = dataKey => getOr(undefined, ['api', dataKey, 'error'])

export const getLoading = dataKey => getOr(false, ['api', dataKey, 'isLoading'])

export const getMessage = dataKey => getOr('', ['api', dataKey, 'message'])

export const getCode = dataKey => getOr('', ['api', dataKey, 'code'])

export const getUser = getData('user')
