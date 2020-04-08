import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components/macro'
import PaymentIcon from 'react-payment-icons'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'
import { StroveButton, SEO, Header, Modal } from 'components'
import { StyledSelect } from 'pages/dashboard/styled'
import StripeCheckoutForm from 'components/stripeCheckoutForm'
import { CANCEL_SUBSCRIPTION, REVERT_CANCEL, GET_PAYMENT_INFO } from 'queries'
import { mutation, query, updateOrganizations } from 'utils'

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

const PageWrapper = styled(Wrapper)`
  min-height: calc(100vh - 64px);
  flex-direction: column;
  width: 100vw;
  padding: 0 40px;
  max-width: 1000px;
`

const PlansWrapper = styled(PageWrapper)`
  flex-direction: row;
  width: 100%;
`

const LinkGeneratorWrapper = styled(Wrapper)`
  width: 100%;
  padding: 20px;
  height: auto;
  justify-content: center;
  align-items: center;
`

const InviteLinkGenerator = () => {
    const isImmortalGodKing = true
  return (
    <div>
      {isImmortalGodKing && (
        <LinkGeneratorWrapper>
          <Text>I am the destiny</Text>
        </LinkGeneratorWrapper>
      )}
    </div>
  )
}
