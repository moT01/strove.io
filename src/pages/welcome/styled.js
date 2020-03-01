import styled, { css } from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'
import { Form, Field } from 'formik'

export const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

export const InvitationTitle = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
`

export const LoginTitle = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InvitationDetails = styled.div`
  color: ${({ theme }) => theme.colors.c11};
  font-size: 18px;
  margin: 10px;
`

export const Illustration = styled.img`
  margint: 0 0 0 10px;
  max-width: 520px;
`

export const WelcomeWrapper = styled.div`
  padding: 20px;
  max-width: 1400px;
  background-color: ${({ theme }) => theme.colors.c2};
  z-index: 3;
  display: flex;
  flex-direction: ${isMobileOnly ? 'column' : 'row'};
`

export const SectionWrapper = styled.div`
  padding: 10px;
  max-width: 520px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const FormWrapper = styled.div`
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
  ${isMobileOnly &&
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
    ${isMobileOnly &&
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
    ${isMobileOnly &&
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

export const StyledForm = styled(Form)`
  width: 100%;
`
export const FormField = styled(Field)`
  color: ${({ theme }) => theme.colors.c12};
  width: 100%;
  height: 56px;
  padding: 10px 20px;
  line-height: 36px;
  font-size: 17px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.2px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
`

export const StyledFormWrapper = styled.div`
  margin: 10px 0;
  width: 100%;
  padding: 20px;
  max-width: 800px;
`
