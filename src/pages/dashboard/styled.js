import styled, { keyframes, css } from 'styled-components/macro'
import { Icon } from 'antd'
import { isMobileOnly } from 'react-device-detect'
import { Form } from 'formik'
import Select from 'react-select'

/* This breaks in prod for some reason */
import StroveButton from '../../components/stroveButton.js'

export const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
    padding-left: ${({ isInvite }) => (isInvite ? '64px' : '8px')};
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

export const InviteFormWrapper = styled(FormWrapper)`
  width: 80vw;
  max-width: 700px;
`

export const StyledForm = styled(Form)`
  width: 100%;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const PageWrapper = styled(Wrapper)`
  width: 100vw;
  min-height: calc(100vh - 64px);
  padding-top: 10px;
  padding: 0 20px;
  justify-content: space-between;
`

export const TeamTileWrapper = styled(Wrapper)`
  margin: 0px 0px 30px 0px;
  transition: all 0.2s;
  width: 100%;
  height: auto;
`

export const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  animation: ${FullFadeIn} 0.5s ease-out;
`

export const DashboardWrapper = styled(TilesWrapper)`
  width: ${isMobileOnly ? '100%' : '80%'};
  max-width: 1200px;
`

export const Title = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.c3};
  margin: 3px 3px 3px 0;
  font-weight: 600;
`

export const SectionTitle = styled(Title)`
  font-size: 1.2rem;
  font-weight: 400;
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: ${({ expanded, theme }) =>
    expanded ? '0' : ` 0 15px 15px -15px ${theme.colors.c19}`};
  margin: 15px;
  width: 50%;
  transition: all 0.2s;
`

export const TeamTile = styled(Tile)`
  width: 100%;
  padding: 0px;
  margin: 0px;
  border-top: none;
`

export const TeamTileSection = styled(Tile)`
  align-items: flex-start;
  margin: 0px;
  padding: 10px;
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  border-width: 1px 0px 0px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  width: 100%;
  box-shadow: none;
  padding-bottom: 0;
`

export const ModalButton = styled(StroveButton)`
  animation: ${FullFadeIn} 0.2s ease-out;
  border-radius: 2px;
  max-width: 150px;
  padding: 5px;
`

export const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin-left: 10px;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const OrganizationName = styled(Text)`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.c25};
  font-size: 1.6rem;
  height: 1.9rem;
  font-weight: 700;
  margin: 0px;
`

export const ModalText = styled(Text)`
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
  word-break: break-word;
  margin: 15px;
`

export const WarningText = styled(ModalText)`
  color: ${({ theme }) => theme.colors.c26};
  margin-bottom: 8px;
  word-break: break-word;
`

export const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: 100%;
  height: 100%;
  flex-direction: ${({ columnOnMobile }) =>
    columnOnMobile && isMobileOnly ? 'column' : 'row'};
`

export const Divider = styled(VerticalDivider)`
  justify-content: space-between;
  flex-direction: ${({ columnOnMobile }) =>
    columnOnMobile && isMobileOnly ? 'column' : 'row'};
`

export const RowWrapper = styled(VerticalDivider)`
  border-width: 0px 0px 1px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-style: solid;
  min-height: 60px;

  :last-of-type {
    border: none;
  }
`

export const InviteStatus = styled.span`
  color: ${({ theme }) => theme.colors.c16};
  margin-left: 24px;
`

export const IconWrapper = styled(Wrapper)`
  min-width: 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  margin-right: 5px;

  i {
    line-height: 0;
  }
`

export const StyledIcon = styled(Icon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.c11};
`

export const ExpandIcon = styled(StyledIcon)`
  font-size: 1rem;
  transform: ${({ expanded }) =>
    expanded ? ' rotate(180deg)' : 'rotate(0deg)'};
  color: ${({ theme }) => theme.colors.c3};
  animation: ${FullFadeIn} 0.5s ease-out;
  transition: all 0.2s;
  cursor: pointer;

  :focus {
    outline: none;
  }
`

export const StyledCloseIcon = styled(Icon)`
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

export const TeamTileHeader = styled(Tile)`
  width: 100%;
  margin: 0;
  padding: 10px;
  transition: all 0.2s;
  border-bottom-left-radius: ${({ expanded }) => (expanded ? '0px' : '5px')};
  border-bottom-right-radius: ${({ expanded }) => (expanded ? '0px' : '5px')};
  ${({ expanded }) => expanded && 'border-bottom: none;'}

  ${Title} {
    color: ${({ theme }) => theme.colors.c3};
    transition: all 0.2s;
  }

  ${({ shouldTabsBeCollapsable }) =>
    shouldTabsBeCollapsable &&
    `
    :hover {
      background-color: ${({ theme }) => theme.colors.c19};
    }
  `}
`

export const TileSectionHeader = styled(TeamTileHeader)`
  flex-direction: row;
  justify-content: flex-start;
  border-width: 1px 0px 0px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  box-shadow: none;

  background-color: ${({ theme, expanded }) =>
    expanded ? theme.colors.c1 : theme.colors.c2};

  ${Title} {
    color: ${({ theme, expanded }) =>
      expanded ? theme.colors.c2 : theme.colors.c3};
    transition: all 0.2s;
    padding: 0;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.c2};
    ${Title} {
      color: ${({ theme }) => theme.colors.c3};
    }
    ${ExpandIcon} {
      color: ${({ theme }) => theme.colors.c3};
    }
  }
`

export const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0 0;
`

export const DropdownWrapper = styled.div`
  width: 20vw;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.c3};
`

export const StyledSelect = styled(Select)`
  width: 100%;
`

export const Setting = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
`

export const UserPhoto = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin: 0;
`

export const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.c3};
  margin: 5px 5px 5px 0;
`

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const RightSection = styled(FlexWrapper)`
  height: 100%;
  padding-right: 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: ${isMobileOnly ? 'flex-start' : 'flex-end'};
  transition: all 0.4s;
  opacity: 0;

  ${isMobileOnly &&
    `
  margin-top: 10px;
  width: 100%;
  padding-right: 0;
  opacity: 1;

  button {
    align-self: center;
    width: 100%;
    max-width: 250px;
  }
  `}
`

export const ProjectsTile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-color: ${({ theme }) => theme.colors.c4};
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  width: 100%;
  transition: all 0.2s;

  :hover {
    background-color: ${({ theme }) => theme.colors.c24};
    ${RightSection} {
      opacity: 1;
    }
  }

  :last-of-type {
    border: none;
  }
`

export const InfoWrapper = styled(FlexWrapper)`
  width: 100%;
  margin: 0;
  padding-left: 10px;
  align-items: flex-start;
  overflow: hidden;
`

export const TextWrapper = styled(FlexWrapper)`
  flex-direction: row;
  margin-bottom: 3px;
  height: auto;
  justify-content: flex-start;

  :last-of-type {
    margin: 0;
  }
`

export const CircleIcon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background: ${({ theme, active }) =>
    active ? theme.colors.c8 : theme.colors.c9};
`

export const StyledErrors = styled(Text)`
  color: ${({ theme }) => theme.colors.c5};
`

export const ProjectActionIcon = styled(Icon)`
  font-size: 20px;
  line-height: 20px;
`

export const IconDescription = styled.div`
  margin-right: 5px;
`

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0px;
`

export const InviteWrapper = styled.div`
  width: 320px;
`
