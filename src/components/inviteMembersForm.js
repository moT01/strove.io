import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components/macro'
import { Formik, FieldArray, Field, Form } from 'formik'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'
import { isMobileOnly } from 'react-device-detect'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { ADD_MEMBER } from 'queries'
import { mutation, updateOrganizations } from 'utils'

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

const InviteMembersForm = ({ history, limit }) => {
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{ emails: ['', '', ''] }}
      validationSchema={validationSchema}
      onSubmit={values => {
        dispatch(
          mutation({
            name: 'addMember',
            mutation: ADD_MEMBER,
            variables: {
              memberEmails: [
                ...new Set(values.emails.map(email => email.value)),
              ],
              teamId: myOrganizations[0]?.teams[0]?.id,
            },
            onSuccessDispatch: updateOrganizations,
            onSuccess: () => {
              history.push('/welcome/helloThere')
            },
          })
        )
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
              disabled={errors?.emails || !values?.emails.some(email => email)}
            />
          </EnvButtonsWrapper>
          {errors?.emails && <TextToLeft>Invalid email</TextToLeft>}
        </StyledForm>
      )}
    />
  )
}

export default memo(withRouter(InviteMembersForm))
