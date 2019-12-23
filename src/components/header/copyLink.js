import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'
import copyToClipboard from 'copy-to-clipboard'
import { Copy } from 'components/svgs'

import { selectors } from 'state'

const CopyWrapper = styled.div`
  cursor: pointer;
  display: flex;

  svg {
    height: 20px;
  }
`

const LinkText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 16px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 300;
  margin: 0;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.c3};
    svg {
      fill: ${({ theme }) => theme.colors.c3};
    }
  }
`

const StyledCopyIcon = styled(Copy)`
  height: ${props => (props.isEditor ? '16px' : '25px')};
  width: ${props => (props.isEditor ? '16px' : '25px')};
  fill: ${({ theme }) => theme.colors.c2};
`

const CopyLink = props => {
  const currentProject = useSelector(selectors.api.getCurrentProject)
  return (
    <>
      {window.location.pathname === '/app/editor/' && currentProject?.repoLink && (
        <CopyWrapper
          onClick={() =>
            copyToClipboard(
              `https://strove.io/#${currentProject?.repoLink}`.replace(
                '.git',
                ''
              ),
              {
                message:
                  'Press #{key} to copy link to the project for easy sharing',
              }
            )
          }
        >
          {isMobileOnly ? (
            <StyledCopyIcon {...props} />
          ) : (
            <LinkText>Copy link</LinkText>
          )}
        </CopyWrapper>
      )}
    </>
  )
}
export default memo(CopyLink)
