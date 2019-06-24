import React from "react"
import { navigate } from "gatsby"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"

const getUserToken = state =>
  state.fetch.user.data && state.fetch.user.data.siliskyToken

const getToken = createSelector(
  [getUserToken],
  token => token
)

/* Based on https://github.com/gatsbyjs/gatsby/blob/master/examples/simple-auth/src/components/PrivateRoute.js */
const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const token = useSelector(getToken)

  console.log("location.pathname", location.pathname)

  if (!token && location.pathname !== `/`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/`)
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
