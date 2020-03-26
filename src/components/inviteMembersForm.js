import React, { useState, memo, useEffect } from 'react'
import styled, { css } from 'styled-components/macro'
import { Formik, FieldArray, Field, Form } from 'formik'
import * as Yup from 'yup'
import { isMobileOnly } from 'react-device-detect'

import { useSelector, useDispatch } from 'react-redux'
import { ADD_MEMBER, UPGRADE_SUBSCRIPTION } from 'queries'
import { selectors, actions } from 'state'
import FullScreenLoader from 'components/fullScreenLoader'
import { StroveButton, Modal } from 'components'
import { mutation, updateOrganizations } from 'utils'
import { ModalButton, ModalText } from 'pages/dashboard/styled'

const validationSchema = Yup.object().shape({
  emails: Yup.array()
    .of(Yup.string().email())
    .required('No emails to invite')
    .min(1, 'No emails to invite'),
})

const EmailsWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const EnvButtonsWrapper = styled(ColumnWrapper)`
  justify-content: flex-start;
  align-items: center;
`

const TableWrapper = styled(ColumnWrapper)`
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0 0 10px;
`

const AddButton = styled.button`
  height: 30px;
  text-align: center;
  align-self: flex-end;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  background: none;
  border: none;
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

export const TextToLeft = styled.div`
  text-align: left;
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

const emptyWarningModalContent = {
  visible: false,
  content: null,
  onSubmit: null,
  buttonLabel: '',
}

const InviteMembersForm = ({ limit, onSuccess, setAddMemberModal }) => {
  const dispatch = useDispatch()
  const paymentStatus = useSelector(selectors.api.getPaymentStatus)
  const editedOrganization = useSelector(
    selectors.editedOrganization.getEditedOrganization
  )
  const editedTeam = useSelector(selectors.editedOrganization.getEditedTeam)
  const [addMemberEmail, setAddMemberEmail] = useState(false)
  const [warningModal, setWarningModal] = useState(emptyWarningModalContent)

  useEffect(() => {
    if (
      paymentStatus?.data?.paymentStatus?.status === 'success' &&
      editedTeam
    ) {
      console.log('Premature addProject')
      dispatch(
        mutation({
          name: 'addMember',
          mutation: ADD_MEMBER,
          allowRepeated: true,
          variables: { memberEmails: addMemberEmail, teamId: editedTeam.id },
          onSuccess: () => {
            onSuccess()
            setWarningModal({
              visible: true,
              content: (
                <ModalText>
                  <span role="img" aria-label="confetti">
                    🎉
                  </span>{' '}
                  We have sent the invitation emails and upgraded your
                  subscription.{' '}
                  <span role="img" aria-label="confetti">
                    🎉
                  </span>
                </ModalText>
              ),
            })
          },
          onSuccessDispatch: [
            updateOrganizations,
            actions.editedOrganization.resetEditedOrganization,
          ],
        })
      )
    }

    if (paymentStatus?.data?.paymentStatus?.status === 'fail' && editedTeam) {
      setWarningModal({
        visible: true,
        content: (
          <>
            {' '}
            <ModalText>
              Your payment couldn't be processed. Please check your payment
              information and try again
            </ModalText>
            <StroveButton
              isLink
              to="/app/plans"
              text="Plans"
              padding="15px"
              minWidth="250px"
              maxWidth="250px"
              margin="10px"
              fontSize="1.4rem"
              borderRadius="5px"
            />
          </>
        ),
      })
    }

    paymentStatus?.data?.paymentStatus?.status === 'success' &&
      editedTeam &&
      dispatch(
        mutation({
          name: 'addMember',
          mutation: ADD_MEMBER,
          allowRepeated: true,
          variables: { memberEmails: addMemberEmail, teamId: editedTeam.id },
          onSuccess: () => {
            onSuccess()
            closeWarningModal()
          },
          onSuccessDispatch: [
            updateOrganizations,
            actions.editedOrganization.resetEditedOrganization,
          ],
        })
      ) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentStatus])

  const closeWarningModal = () => {
    setWarningModal(emptyWarningModalContent)
  }

  const addMember = ({ memberEmails, setAddMemberModal }) => {
    const users = [
      ...(editedTeam?.users?.map(user => user.email) || []),
      ...(editedTeam?.invited?.map(user => user.email) || []),
      editedOrganization?.owner?.email,
      editedTeam?.teamLeader?.email,
    ]
    const usersToInvite = memberEmails.filter(
      email => users?.findIndex(user => user === email) === -1
    )
    const subscriptionQuantity = editedOrganization?.subscriptionQuantity
    const subscriptionStatus = editedOrganization.subscriptionStatus

    if (usersToInvite.length === 0) {
      setWarningModal({
        visible: true,
        content: (
          <ModalText>
            Those users have already been invited to {editedTeam.name}.
          </ModalText>
        ),
      })
    } else {
      if (subscriptionStatus === 'active') {
        setWarningModal({
          visible: true,
          content: (
            <FullScreenLoader
              type="processPayment"
              isFullScreen
              color="#0072ce"
            />
          ),
          noClose: true,
        })
        dispatch(
          mutation({
            name: 'upgradeSubscription',
            mutation: UPGRADE_SUBSCRIPTION,
            variables: {
              organizationId: editedOrganization.id,
              quantity: subscriptionQuantity + usersToInvite.length,
            },
            onSuccess: () => setAddMemberEmail(usersToInvite),
            onError: () =>
              setWarningModal({
                visible: true,
                content: (
                  <>
                    <ModalText>Your payment couldn't be processed.</ModalText>
                    <ModalText>
                      Please make sure your payment information is correct and
                      try again.
                    </ModalText>
                    <StroveButton
                      isLink
                      to="/app/plans"
                      text="Settings"
                      isPrimary
                      minWidth="150px"
                      maxWidth="150px"
                      borderRadius="2px"
                      padding="5px"
                      margin="10px 0px"
                    />
                  </>
                ),
              }),
          })
        )
      } else if (subscriptionStatus === 'inactive') {
        dispatch(
          mutation({
            name: 'addMember',
            mutation: ADD_MEMBER,
            allowRepeated: true,
            variables: { memberEmails: usersToInvite, teamId: editedTeam.id },
            onSuccess: () => {
              onSuccess()
              closeWarningModal()
            },
            onSuccessDispatch: [
              updateOrganizations,
              actions.editedOrganization.resetEditedOrganization,
            ],
          })
        )
      }
    }
  }
  return (
    <>
      <Formik
        initialValues={{ emails: ['', '', ''] }}
        validationSchema={validationSchema}
        onSubmit={values => {
          const emailsArray = [...new Set(values.emails.filter(email => email))]
          console.log('I am doing stuff')
          addMember({ memberEmails: [...emailsArray] })
        }}
        render={({ values, errors }) => (
          <StyledForm>
            <EmailsWrapper>
              <FieldArray
                name="emails"
                render={arrayHelpers => (
                  <TableWrapper>
                    <Table>
                      {values.emails.map((env, index) => (
                        <TableRow key={index}>
                          <FormField
                            type="email"
                            placeholder="name@example.com"
                            name={`emails[${index}]`}
                            noValidate
                          />
                        </TableRow>
                      ))}
                    </Table>
                    {(!limit || values?.emails?.length < limit) && (
                      <AddButton
                        type="button"
                        onClick={() => {
                          if (values?.emails?.length < limit) {
                            arrayHelpers.push('')
                          }
                        }}
                      >
                        + Add another
                      </AddButton>
                    )}
                  </TableWrapper>
                )}
              />
            </EmailsWrapper>
            <EnvButtonsWrapper>
              <StroveButton
                margin="20px 0 10px"
                isPrimary
                type="submit"
                text="Add Teammates"
                disabled={
                  errors?.emails || !values?.emails.some(email => email)
                }
              />
            </EnvButtonsWrapper>
            {errors?.emails && <TextToLeft>Invalid email</TextToLeft>}
          </StyledForm>
        )}
      />
      <Modal
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
        height={isMobileOnly ? '30vh' : '20vh'}
        isOpen={warningModal.visible}
        onRequestClose={() => !warningModal.noClose && closeWarningModal()}
        contentLabel="Warning"
        ariaHideApp={false}
      >
        {warningModal.content}
        {warningModal.buttonLabel && (
          <ModalButton
            isPrimary
            onClick={warningModal.onSubmit}
            text={warningModal.buttonLabel}
            padding="5px"
            maxWidth="150px"
          />
        )}
        {!warningModal.noClose && (
          <ModalButton
            onClick={closeWarningModal}
            text="Close"
            padding="5px"
            maxWidth="150px"
          />
        )}
      </Modal>
    </>
  )
}

export default memo(InviteMembersForm)
