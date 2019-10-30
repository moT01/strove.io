import getOr from 'lodash/fp/getOr'

/* Rest is used to get data from nested objects */
export const getApiData = (dataKey, defaultValue = {}, ...rest) =>
  getOr(defaultValue, ['api', dataKey, 'data', ...rest])

export const getError = dataKey => getOr(undefined, ['api', dataKey, 'error'])

export const getLoading = dataKey => getOr(false, ['api', dataKey, 'isLoading'])

export const getMessage = dataKey => getOr('', ['api', dataKey, 'message'])

export const getCode = dataKey => getOr(null, ['api', dataKey, 'code'])

export const getUserField = dataKey => state =>
  state?.api?.user?.data?.[dataKey]

export const getUser = getApiData('user', null)

export const getUserProjects = getApiData('myProjects', [])

export const getCurrentProject = state =>
  getApiData('myProjects', [])(state).find(item => item.machineId)

// getApiData2({ nestedFields, defaultValue })
export const getApiData2 = ({ fields, defaultValue = {} }) =>
  Array.isArray(fields)
    ? getOr(defaultValue, ['api', fields[0], 'data', ...fields.slice(1)])
    : getOr(defaultValue, ['api', fields, 'data'])
