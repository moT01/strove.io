import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components/macro'
import PaymentIcon from 'react-payment-icons'
import { isMobileOnly } from 'react-device-detect'
import copyToClipboard from 'copy-to-clipboard'

import { selectors } from 'state'
import { StroveButton, SEO, Header, Modal } from 'components'
import { mutation, query, updateOrganizations } from 'utils'
import { Copy } from 'components/svgs'

export const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const SectionWrapper = styled(Wrapper)`
  width: 100%;
  align-items: flex-start;
  animation: ${FadeInAnimation} 0.2s ease-out;
  margin-bottom: 30px;
`

const LinkGeneratorWrapper = styled(Wrapper)`
  width: 100%;
  padding: 20px;
  height: auto;
  justify-content: center;
  align-items: center;
`

const InputContainer = styled(Wrapper)`
  flex-direction: row;
  height: 30px;
  max-width: 300px;
  justify-content: flex-start;
`

const StyledInput = styled.input`
  height: 30px;
  width: 60%;
  margin: 5px;
  :focus {
    outline: none;
  }
`

const StyledCopyIcon = styled(Copy)`
  height: ${props => (props.isEditor ? '16px' : '25px')};
  width: ${props => (props.isEditor ? '16px' : '25px')};
  fill: ${({ theme }) => theme.colors.c2};
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

const InviteLinkGenerator = () => {
  const isOpenSource = process.env.REACT_APP_IS_OPENSOURCE
  const user = useSelector(selectors.api.getUser)
  const editedTeam = useSelector(selectors.editedOrganization.getEditedTeam)
  const isImmortalGodKing =
    isOpenSource && user?.stroveKey === process.env.REAC_APP_ADMIN_KEY
  const [linkCopied, setLinkCopied] = useState(false)

  const generateLink = () => {
    console.log('The team', editedTeam)
  }

  const copyLink = () => {
    if (!linkCopied) {
      copyToClipboard(editedTeam?.name)
      setLinkCopied(true)
    }
  }

  return (
    <>
      {isImmortalGodKing && (
        <SectionWrapper>
          <LinkGeneratorWrapper>
            <Text>I am the destiny</Text>
            <InputContainer>
              <StyledInput
                value={
                  editedTeam ? `${editedTeam.name}` : 'Generate invite link'
                }
                onFocus={copyLink}
                readOnly
              />
              <StroveButton layout="form" height="26px" padding="0px">
                <StyledCopyIcon />
              </StroveButton>
            </InputContainer>
            <StroveButton
              isPrimary
              width="150px"
              margin="0px"
              borderRadius="2px"
              padding="3px"
              onClick={generateLink}
              text="Generate link"
            ></StroveButton>
          </LinkGeneratorWrapper>
        </SectionWrapper>
      )}
    </>
  )
}

export default memo(InviteLinkGenerator)
