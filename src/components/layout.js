import React, { useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"

import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

import Header from "./header"
import "./layout.css"
import { ADD_GITHUB_PROJECT, GET_REPO_INFO } from "../queries"
import { mutate } from "../utils"

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  fetch,
})

const getUserName = state => state.fetch.user.data && state.fetch.user.data.name

const getUserPhoto = state =>
  state.fetch.user.data && state.fetch.user.data.photoUrl

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const LayoutComponent = ({ children, location }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUserData)

  useEffect(() => {
    const machineId = `5d0ba955d0027b3e519b4c39`
    const githubLink =
      location.hash.match(/#(.*)/) && location.hash.match(/#(.*)/)[1]

    console.log("TCL: LayoutComponent -> repoUrl", githubLink)
    console.log("TCL: LayoutComponent -> user", user)
    if (githubLink) {
      const query = async () => {
        const query = GET_REPO_INFO
        const context = {
          headers: {
            Authorization: `Bearer ${user.githubToken}`,
            "User-Agent": "node",
          },
        }
        const repoUrlParts = githubLink.split("/")
        const owner = repoUrlParts[3]
        const name = repoUrlParts[4]
        const variables = { owner, name }
        try {
          const { data } = await client.query({
            query,
            context,
            variables,
            fetchPolicy: "no-cache",
          })

          const {
            description,
            name /* add language and color in future */,
          } = data.repository
          console.log("TCL: query -> data", data)

          dispatch(
            mutate({
              mutation: ADD_GITHUB_PROJECT,
              context: {
                headers: {
                  Authorization: `Bearer ${user.siliskyToken}`,
                },
              },
              variables: { githubLink, machineId, name, description },
              mutationName: "addProject",
              storeName: "project",
            })
          )
        } catch (e) {
          console.log("fetch error: ", e)
        }
      }
      query()
      console.log(query())
      console.log("nothing")
    }
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              margin: `0 auto`,
              maxWidth: "100vw",
              paddingTop: 0,
            }}
          >
            <main>{children}</main>
          </div>
        </>
      )}
    />
  )
}

const Layout = ({ children }) => (
  <Location>
    {({ location }) => (
      <LayoutComponent location={location} children={children} />
    )}
  </Location>
)

export default Layout
