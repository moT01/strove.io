/* eslint-disable react/jsx-no-comment-textnodes */
import React, { memo } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { Layout, SEO } from 'components'

const CodeArea = styled.div`
  position: absolute;
  max-width: 640px;
  min-width: 320px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  > span {
    display: block;
  }

  @media screen and (max-width: 320px) {
    .code-area {
      font-size: 5vw;
      min-width: auto;
      width: 95%;
      margin: auto;
      padding: 5px;
      padding-left: 10px;
      line-height: 6.5vw;
    }
  }
`

const ErrorMessage = styled.span`
  color: #777;
  font-style: italic;
`

const ErrorBody = styled.div`
  background-color: #081421;
  width: 100vw;
  height: 97vh;
  color: #d3d7de;
  font-family: 'Courier new';
  font-size: 18px;
  line-height: 1.5em;
  cursor: default;
  a {
    color: ${({ theme }) => theme.colors.c2};
  }
`

const NotFound = () => (
  <ErrorBody>
    <CodeArea>
      <ErrorMessage>/* Page not found */</ErrorMessage>
      <span>
        <span style={{ color: '#d65562' }}>if</span>
        <span style={{ color: '#bdbdbd' }}> (</span>
        <span style={{ color: '#4ca8ef' }}>!</span>
        <span style={{ fontStyle: 'italic', color: '#bdbdbd' }}>
          found) <span style={{ color: '#a6a61f' }}>{'{'}</span>
        </span>
      </span>
      <span>
        <span style={{ paddingLeft: '15px', color: '#2796ec' }}>
          <i style={{ width: '10px', display: 'inline-block' }} />
          throw
        </span>
        <span>
          (<span style={{ color: '#a6a61f' }}>"(╯°□°)╯︵ ┻━┻"</span>)
        </span>
        <span style={{ display: 'block', color: '#a6a61f' }}>{'}'}</span>

        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <span style={{ color: '#777', fontStyle: 'italic' }}>
            // Go back to main page!
          </span>
        </Link>
      </span>
    </CodeArea>
  </ErrorBody>
)

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <NotFound />
  </Layout>
)

export default memo(NotFoundPage)
