import getOr from 'lodash/fp/getOr'
import { createSelector } from 'reselect'

export const getApiData = ({ fields, defaultValue = {} }) =>
  Array.isArray(fields)
    ? getOr(defaultValue, ['api', fields[0], 'data', ...fields.slice(1)])
    : getOr(defaultValue, ['api', fields, 'data'])

export const getError = dataKey => getOr(undefined, ['api', dataKey, 'error'])

export const getLoading = dataKey => getOr(false, ['api', dataKey, 'isLoading'])

export const getMessage = dataKey => getOr('', ['api', dataKey, 'message'])

export const getCode = dataKey => getOr(null, ['api', dataKey, 'code'])

export const getUserField = dataKey => state =>
  state?.api?.user?.data?.[dataKey]

export const getUser = getApiData({ fields: 'user', defaultValue: null })

export const getUserProjects = getApiData({
  fields: 'myProjects',
  defaultValue: [],
})

export const getMyTeams = getApiData({
  fields: 'myTeams',
  defaultValue: [],
})

export const getMyOrganizations = getApiData({
  fields: 'myOrganizations',
  defaultValue: [],
})

export const getQueuePosition = getApiData({
  fields: ['user', 'queuePosition'],
})

export const getPaymentStatus = getApiData({
  fields: 'paymentStatus',
  defaultValue: {},
})

export const getCurrentProject = createSelector(
  getMyOrganizations,
  organizations => {
    let projects = []
    organizations.forEach(organization => {
      organization.teams.forEach(team => {
        projects.push(...team.projects)
      })
    })

    return projects.find(project => project.machineId)
  }
)
