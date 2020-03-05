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

export const getUserId = getApiData({
  fields: ['user', 'id'],
  defaultValue: null,
})

export const getPaymentStatus = getApiData({
  fields: 'paymentStatus',
  defaultValue: {},
})

export const getProjects = createSelector(getMyOrganizations, organizations => {
  let projects = []
  organizations.forEach(organization => {
    organization.teams &&
      organization.teams.forEach(team => {
        if (Array.isArray(team?.projects)) {
          projects = [...projects, ...team.projects]
        }
      })
  })
  return projects
})

export const getActiveProjects = createSelector(getProjects, projects => {
  return projects.filter(project => project?.machineId)
})

export const getCurrentProject = createSelector(
  getActiveProjects,
  getUserId,
  (projects, userId) => {
    return projects.find(project => project?.userId === userId)
  }
)
