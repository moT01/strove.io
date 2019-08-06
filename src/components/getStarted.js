import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import { Link } from 'gatsby'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'
import { templates } from 'constants'
import AddProjectProvider from 'components/addProjectProvider'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
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

const AddProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin-bottom: 0;
  height: 35h;
  width: ${props => (props.mobile ? '90vw' : '50vw')};

  /* @media (max-width: 1366px) {
    width: 100vw;
    height: auto;
  } */
`

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
`

const TemplatesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding: 0.5vh;
  justify-content: ${props => (props.mobile ? 'flex-start' : 'center')};
  align-items: center;
  overflow-x: ${props => (props.mobile ? 'scroll' : 'visible')};

  ${props =>
    props.mobile &&
    css`
      border: 1px solid #0072ce;
      box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
      border-radius: 5px;
      margin: 10px 0 10px 0;
    `}
`

const TemplateContainer = styled.a`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: 0.25vh;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;

  :hover {
    transform: translateY(-3px);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`

const IconContainer = styled.div`
  width: ${props => (props.mobile ? '20vw' : '5vw')};
  height: ${props => (props.mobile ? '20vw' : '5vw')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TemplateText = styled.p`
  color: #0072ce;
  font-size: 1rem;
  margin-left: 2%;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: ${props => (props.mobile ? '100%' : '20%')};
  min-width: 70px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
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
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
        transform: translateY(-1px);
      }
    `}
`

const Title = styled.h3`
  font-size: ${props => (props.mobile ? '1rem' : '1.4rem')};
  color: #0072ce;
  margin: 0.3vh 0.3vh 0.3vh 0;
`

const SectionDivider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
`

const SectionDividerLine = styled.div`
  flex: 1;
  border-top: 1px solid #0072ce;
`

const SectionDividerText = styled(Title)`
  flex: 2;
  margin: 0.5vh;
`

const GithubLinkInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: #0072ce;
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-align: center;
  font-size: 1rem;
  padding: 0.5vh 0;

  :focus {
    outline: none;
  }
`

const GithubLinkForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 2vh 0 0;
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0;
  height: 0.9rem;
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  height: auto;
  width: ${props => (props.mobile ? '100%' : '20%')};
  min-width: 70px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  opacity: 0.9;
  cursor: pointer;

  :focus {
    outline: 0;
  }

  &:hover {
    opacity: 1;
    box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
    transform: translateY(-1px);
  }
`

const Templates = ({ addProject }) => {
  const repoError = useSelector(selectors.api.getError('myProjects'))

  const validate = values => {
    let errors = {}

    if (!values.repoLink || (values.repoLink && !values.repoLink.trim())) {
      return
    } else if (
      !/.*(github|gitlab|bitbucket).com\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+/i.test(
        values.repoLink.trim()
      )
    ) {
      errors.repoLink = 'Invalid repository link'
    }

    return errors
  }

  const handleClick = item => addProject(item.link)

  return (
    <AddProjectWrapper mobile={isMobileOnly}>
      <Title mobile={isMobileOnly}>
        Add project from Github or Gitlab repository
      </Title>
      <Formik
        onSubmit={(values, actions) => {
          addProject(values.repoLink.replace(/.git$/, ''))
          actions.setSubmitting(false)
        }}
        validate={validate}
        render={props => (
          <GithubLinkForm onSubmit={props.handleSubmit}>
            <GithubLinkInput
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.repoLink}
              name="repoLink"
              placeholder={
                isMobileOnly
                  ? 'Paste repo link here'
                  : 'https://github.com/evil-corp/worldDomination'
              }
            />
            <ErrorMessage>
              {props.errors.repoLink && (
                <ErrorMessage>{props.errors.repoLink}</ErrorMessage>
              )}
              {repoError &&
                repoError.message &&
                repoError.message.includes(
                  'Could not resolve to a Repository'
                ) && (
                  <ErrorMessage>
                    Provided link leads to a private repository
                  </ErrorMessage>
                )}
            </ErrorMessage>
            <Button
              disabled={!props.values.repoLink || props.errors.repoLink}
              primary
              mobile={isMobileOnly}
              type="submit"
            >
              Add project
            </Button>
          </GithubLinkForm>
        )}
      />
      <SectionDivider>
        {!isMobileOnly && <SectionDividerLine />}
        <SectionDividerText mobile={isMobileOnly}>
          Or try out one of the templates
        </SectionDividerText>
        {!isMobileOnly && <SectionDividerLine />}
      </SectionDivider>
      <ComponentWrapper>
        <TemplatesWrapper mobile={isMobileOnly}>
          {templates.map(item => (
            <TemplateContainer
              key={item.name}
              onClick={() => handleClick(item)}
            >
              <IconContainer mobile={isMobileOnly}>{item.icon}</IconContainer>
              <TemplateText>{item.name}</TemplateText>
            </TemplateContainer>
          ))}
        </TemplatesWrapper>

        <StyledLink mobile={isMobileOnly} to="templates">
          More templates
        </StyledLink>
      </ComponentWrapper>
    </AddProjectWrapper>
  )
}

export default memo(() => (
  <AddProjectProvider>
    {({ addProject }) => <Templates addProject={addProject} />}
  </AddProjectProvider>
))
