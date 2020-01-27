import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { FullScreenLoader } from 'components'
import { selectors } from 'state'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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

const Button = styled.button`
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  line-height: ${props => (props.lineHeight ? props.lineHeight : 'inherit')};
  letter-spacing: ${props =>
    props.letterSpacing ? props.letterSpacing : 'normal'};
  height: ${props => (props.height ? props.height : 'auto')};
  min-width: ${props => (props.minWidth ? props.minWidth : '70px')};
  max-width: ${props => (props.maxWidth ? props.maxWidth : 'none')};
  width: ${props => (props.width ? props.width : '100%')};
  display: flex;
  flex-direction: row;
  margin: ${props => (props.margin ? props.margin : '5px')};
  padding: ${props => (props.padding ? props.padding : '10px 30px')};
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ primary, theme, isDelete, isDashboard }) =>
    (primary && theme.colors.c2) ||
    (isDelete && theme.colors.c2) ||
    (isDashboard && theme.colors.c2) ||
    theme.colors.c1};
  background-color: ${({ theme, primary, isDelete, isDashboard }) =>
    (primary && theme.colors.c1) ||
    (isDelete && theme.colors.c5) ||
    (isDashboard && theme.colors.c21) ||
    theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  border-radius: ${({ borderRadius, isDashboard }) =>
    borderRadius || (isDashboard && '2px') || '5px'};
  border-color: ${({ theme, isDelete, isDashboard }) =>
    (isDelete && theme.colors.c2) ||
    (isDashboard && theme.colors.c21) ||
    theme.colors.c1};
  box-shadow: 0 10px 10px -15px ${({ theme, isDashboard }) => (isDashboard && theme.colors.c21) || theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0, 5s ease-out;
  opacity: 0.9;
  :focus {
    outline: 0;
  }
  &:disabled {
    opacity: 0.4;
  }
  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        box-shadow: 0 12px 12px -13px ${({ theme, isDashboard }) => (isDashboard && theme.colors.c21) || theme.colors.c1};
        transform: translateY(-1px);
      }
    `}
`

const FormButton = styled.button`
  width: 156px;
  height: 56px;
  color: ${({ theme }) => theme.colors.c2};
  background: ${({ theme }) => theme.colors.c1};
  text-transform: uppercase;
  display: block;
  text-align: center;
  padding: 0;
  border: 0;
  font-size: 14px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.8px;
  transition: opacity 0.2s;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  outline: none;
  ${({ isMobile }) =>
    isMobile &&
    css`
      box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
        0 8px 24px 0 rgba(174, 174, 186, 0.16);
      border-radius: 5px;
      width: 100%;
      margin-top: 10px;
    `}
  ${props =>
    !props.disabled
      ? css`
          cursor: pointer;
          &:hover {
            opacity: 1;
            box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
              0 9px 26px 0 rgba(174, 174, 186, 0.16);
          }
        `
      : css`
          cursor: not-allowed;
        `}
`

const StroveButton = props => {
  const isLoading = useSelector(selectors.api.getLoading('user'))
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))

  return props.layout === 'form' && !isMobileOnly ? (
    <FormButton mobile={isMobileOnly} {...props}>
      {isLoading ? (
        <FullScreenLoader
          isFullScreen={false}
          color="#ffffff"
          height="1.7rem"
        />
      ) : (
        props.text || props.children
      )}
    </FormButton>
  ) : props.layout === 'form' && isMobileOnly ? (
    <Button
      primary
      fontWeight="700"
      fontSize="20px"
      height="56px"
      mobile={isMobileOnly}
      {...props}
    >
      {isLoading ? (
        <FullScreenLoader
          isFullScreen={false}
          color="#ffffff"
          height="1.7rem"
        />
      ) : (
        props.text || props.children
      )}
    </Button>
  ) : (
    <Button
      disabled={isLoading || props.isDisabled}
      primary={props.isPrimary}
      mobile={isMobileOnly}
      {...props}
    >
      {isLoading || isDeleting || isContinuing || isStopping ? (
        <FullScreenLoader
          isFullScreen={false}
          color="#ffffff"
          height="1.7rem"
        />
      ) : (
        props.text || props.children
      )}
    </Button>
  )
}

export default memo(StroveButton)
