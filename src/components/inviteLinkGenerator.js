import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'
import copyToClipboard from 'copy-to-clipboard'

import { selectors } from 'state'
import { StroveButton } from 'components'
import { mutation, query, updateOrganizations } from 'utils'
import { Copy } from 'components/svgs'
import { CREATE_GUEST_LINK } from 'queries'

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
  margin: 0;
`

const LinkGeneratorWrapper = styled(Wrapper)`
  width: 100%;
  padding: 0px 20px 10px 20px;
  height: auto;
  justify-content: center;
  align-items: center;
`

const HorizontalContainer = styled(Wrapper)`
  width: 100%;
  margin: 10px;
  height: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
`

const InputContainer = styled(HorizontalContainer)`
  width: 90%;
  justify-content: flex-start;
`

const HorizontalLine = styled.div`
  width: 35%;
  border-top: 1px solid ${({ theme }) => theme.colors.c19};
`

const StyledInput = styled.input`
  text-align: center;
  height: 30px;
  width: 100%;
  margin: 0px;
  border: 1px solid ${({ theme }) => theme.colors.c1};
  :focus {
    outline: none;
  }
`

const StyledCopyIcon = styled(Copy)`
  height: 16px;
  width: 16px;
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
  const user = useSelector(selectors.api.getUser)
  const [guestInviteLink, setGuestInviteLink] = useState()
  const dispatch = useDispatch()
  const editedTeam = useSelector(selectors.editedOrganization.getEditedTeam)
  const isImmortalGodKing = user?.stroveKey === process.env.REACT_APP_ADMIN_KEY
  const [linkCopied, setLinkCopied] = useState(false)

  const generateLink = () => {
    dispatch(
      mutation({
        mutation: CREATE_GUEST_LINK,
        name: 'createGuestLink',
        variables: {
          teamId: editedTeam.id,
        },
        onSuccess: data => {
          setGuestInviteLink(data)
        },
      })
    )
  }

  const copyLink = () => {
    if (!linkCopied) {
      copyToClipboard(guestInviteLink)
      setLinkCopied(true)
    }
  }

  return (
    <>
      {isImmortalGodKing && (
        <SectionWrapper>
          <LinkGeneratorWrapper>
            <HorizontalContainer>
              <HorizontalLine />
              <Text>Or</Text>
              <HorizontalLine />
            </HorizontalContainer>
            <StroveButton
              isPrimary
              width="150px"
              margin="0px"
              borderRadius="2px"
              padding="2px"
              onClick={generateLink}
              text="Generate link"
            />
            <InputContainer>
              <StyledInput
                value={guestInviteLink}
                placeholder="Generate invitation link"
                readOnly
              />
              <StroveButton
                layout="form"
                height="30px"
                width="40px"
                padding="0px"
                onClick={copyLink}
                svgContent
              >
                <StyledCopyIcon />
              </StroveButton>
            </InputContainer>
          </LinkGeneratorWrapper>
        </SectionWrapper>
      )}
    </>
  )
}

export default memo(InviteLinkGenerator)
