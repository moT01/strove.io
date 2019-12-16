import React, { memo } from 'react'
import styled, { css, keyframes } from 'styled-components/macro'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
  }
`

const ButtonFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
`

const StyledAnchor = styled.a`
  text-align: center;
  color: ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;
  line-height: 1.7;

  > svg {
    fill: ${({ theme }) => theme.colors.c2};
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }

  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    `}
`

const NoRepoUrl = styled.div`
  font-size: 21px;
  font-weight: 600;
  text-align: center;
`

const RepoUrlInfoExample = styled.div`
  font-size: 18px;
  text-align: center;
  font-style: italic;
  margin-top: 10px;
`

const NoRepoUrlInfo = () => (
  <>
    <NoRepoUrl>Please provide repoUrl in url parameters. Example:</NoRepoUrl>
    <RepoUrlInfoExample>
      https://strove.io/embed/?repoUrl=https://github.com/validatorjs/validator.js
    </RepoUrlInfoExample>
    <RepoUrlInfoExample>
      For more info visit:
      <br />
      <StyledAnchor href="https://docs.strove.io/embedding-strove">
        Strove documentation
      </StyledAnchor>
    </RepoUrlInfoExample>
  </>
)

export default memo(NoRepoUrlInfo)
