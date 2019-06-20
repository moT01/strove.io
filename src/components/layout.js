import React, { useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"
import { useDispatch } from "react-redux"

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

const LayoutComponent = ({ children, location }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const machineID = `5d0ba955d0027b3e519b4c39`
    const githubLink =
      location.hash.match(/#(.*)/) && location.hash.match(/#(.*)/)[1]

    console.log("TCL: LayoutComponent -> repoUrl", githubLink)
    console.log("TCL: LayoutComponent -> location", location)
    if (githubLink) {
      // dispatch(
      //   mutate({
      //     mutation: ADD_GITHUB_PROJECT,
      //     variables: { githubLink, machineID },
      //     mutationName: "addGithubProject",
      //     storeName: "user",
      //   })
      // )

      const query = async () => {
        const query = GET_REPO_INFO
        const context = {
          headers: {
            Authorization: `Bearer `,
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
        } catch (e) {
          console.log("fetch error: ", e)
        }
      }
      query()
      console.log(query())
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
