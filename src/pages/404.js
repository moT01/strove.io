/* eslint-disable react/jsx-no-comment-textnodes */
import React, { memo } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { SEO, Header } from 'components'

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

const StyledIf = styled.span`
  > :first-child {
    color: #d65562;
  }

  > :nth-child(2) {
    color: #bdbdbd;
  }

  > :nth-child(3) {
    color: #4ca8ef;
  }

  > :nth-child(4) {
    font-style: italic;
    color: #bdbdbd;
  }

  > :nth-child(5) {
    color: #a6a61f;
  }
`

const NotFound = () => (
  <ErrorBody>
    <CodeArea>
      <ErrorMessage>/* Page not found */</ErrorMessage>
      <StyledIf>
        <span>if</span>
        <span> (</span>
        <span>!</span>
        <span>found)</span>
        <span>{'{'}</span>
      </StyledIf>
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
  <>
    <SEO title="404: Not found" />
    <Header />
    <NotFound />
  </>
)

export default memo(NotFoundPage)
