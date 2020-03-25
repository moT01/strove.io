import getOr from 'lodash/fp/getOr'

export const getCurrentProject = getOr(null, ['currentProject'])
