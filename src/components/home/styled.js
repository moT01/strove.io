import styled, { keyframes, css } from 'styled-components/macro'
import Modal from 'react-modal'
import { Icon } from 'antd'
import { Form } from 'formik'

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

export const SectionDivider = styled.div`
  display: flex;
  flex-direction: ${({ isMobile, flexDirection }) =>
    flexDirection || (isMobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 1200px;
`

export const SectionWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  padding: ${({ padding }) => padding || '0'};
`

export const SmallSectionWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  max-width: 440px;
  max-height: 440px;
  padding: ${({ padding }) => padding || '0'};
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-around;
`

export const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 400px;
  flex-wrap: wrap;
  margin: 20px 0 5px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
  background: ${({ theme }) => theme.colors.c2};
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  opacity: 0.9;
  align-items: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      box-shadow: none;
      min-width: 100px;
      border-radius: 5px;
    `}
  &:hover {
    opacity: 1;
    box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
      0 9px 26px 0 rgba(174, 174, 186, 0.16);
    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: none;
      `}
  }
  input {
    box-shadow: none;
    color: ${({ theme }) => theme.colors.c12};
    outline: 0;
    background: ${({ theme }) => theme.colors.c2};
    width: calc(100% - 156px);
    height: 56px;
    padding: 0;
    padding-left: 64px;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 36px;
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    border: 0;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    ${({ isMobile }) =>
      isMobile &&
      css`
        flex-direction: column;
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
      `}
  }
  svg {
    position: absolute;
    top: 18px;
    left: 20px;
    height: 24px;
    width: 24px;
    g {
      stroke: ${({ theme }) => theme.colors.c1};
    }
  }
`

export const StyledH2 = styled.h2`
  margin: 0;
  font-size: 36px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: ${({ color, theme }) => color || theme.colors.c2};
`

export const StyledH3 = styled.h3`
  margin: 0;
  font-size: 32px;
  width: 100%;
  text-align: center;
  color: ${({ color, theme }) => color || theme.colors.c26};
`

export const Video = styled.video`
  width: ${props => (props.isMobile ? '90vw' : 'calc(100% - 40px)')};
  margin-top: ${props => (props.isMobile ? '5vh' : '0')};
  outline: none;
`

export const StyledForm = styled(Form)`
  width: 100%;
`

export const StyledInfo = styled.span`
  margin: 20px;
  color: ${({ theme }) => theme.colors.c13};
  font-size: 13px;
`

export const StyledH1 = styled.h1`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.c3};
  font-weight: 700;
  font-size: 40px;
`

export const StyledHeadingSection = styled.div`
  max-width: 520px;
  margin: auto 20px;
  margin-bottom: auto;
  font-size: 20px;

  @media (max-width: 767px) {
    width: 100%;
  }
`

export const StyledProductDescription = styled.h4`
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.c26};
`

export const StyledSmallText = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin: 20px 0;
  ${({ isUpperCase }) => isUpperCase && 'text-transform: uppercase;'}
`

export const StyledFeatureDescription = styled.div`
  font-size: 1rem;
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
  color: ${({ color, theme }) => color || theme.colors.c26};
`

export const StyledTechnologyDescriptionWrapper = styled.div`
  min-height: ${({ isMobile }) => (isMobile ? '150px' : '100px')};
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0;
  max-width: 800px;
  color: ${({ color, theme }) => color || theme.colors.c2};
`

export const StyledGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  background-color: ${({ theme }) => theme.colors.c3};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  border-top: 1px solid white;
`

export const StyledCell = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  margin: 20px;
`

export const IconContainer = styled.div`
  margin: auto 10px;
  width: 40px;
  height: auto;

  @media (max-width: 960px) {
    flex-shrink: 0;
  }
`

export const StyledHeaderText = styled.div`
  margin: 0 10px 5px 10px;
  text-align: left;
`

export const Illustration = styled.img`
  margin: 0 20px;
  width: 50%;
  height: 50%;
  max-width: 520px;
`
