import styled, { keyframes, css } from 'styled-components/macro'
import Modal from 'react-modal'
import { Icon } from 'antd'

export const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const StyledModal = styled(Modal)`
  display: flex;
  height: auto;
  width: auto;
  position: fixed;
  animation: ${FadeIn} 0.2s ease-out;
  :focus {
    outline: 0;
  }
`

export const StyledCellHeader = styled.div`
  margin-bottom: 5px;
  font-size: 28px;
  display: flex;
`

export const StyledSectionWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isSecondary }) =>
    !isSecondary &&
    css`
      min-height: 85vh;
    `}
  width: 100%;
  position: relative;

  ${({ isSecondary, background, theme }) =>
    isSecondary &&
    css`
      background: ${background || theme.colors.c1};
      color: ${theme.colors.c2};
    `}

    padding: ${({ padding }) => padding || '0'};
    ${({ minHeight }) => css`
      min-height: ${minHeight};
    `};

    ${({ background }) =>
      background &&
      css`
        background: ${background};
      `}
`

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.7vh;
  color: ${({ theme }) => theme.colors.c1};
  cursor: pointer;
  :focus {
    outline: none;
  }
`
