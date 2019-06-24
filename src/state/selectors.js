import getOr from "lodash/fp/getOr"

export const getData = (dataKey, defaultValue = {}) =>
  getOr(defaultValue, ["api", dataKey, "data"])

export const getError = dataKey => getOr(undefined, ["api", dataKey, "error"])

export const getLoading = dataKey => getOr(false, ["api", dataKey, "isLoading"])

export const getMessage = dataKey => getOr("", ["api", dataKey, "message"])

export const getCode = dataKey => getOr("", ["api", dataKey, "code"])
