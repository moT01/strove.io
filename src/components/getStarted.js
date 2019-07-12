import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { Icon } from 'antd'

import {
  CSharp,
  Cpp,
  Python,
  Typescript,
  Go,
  Java,
  Ruby,
  Javascript,
} from '../images/logos'
import { createProject } from 'utils'
import { selectors } from 'state'

const templates = [
  { name: 'Typescript', icon: <Typescript /> },
  {
    name: 'Ruby',
    icon: <Ruby />,
    link: 'https://github.com/codengo-llc/ruby-starter',
  },
  { name: 'Javascript', value: 'javascript', icon: <Javascript /> },
  {
    name: 'C++',
    icon: <Cpp />,
    link: 'https://github.com/codengo-llc/c-plus-plus-starter',
  },
  {
    name: 'Python',
    icon: <Python />,
    link: 'https://github.com/codengo-llc/python-starter',
  },
  // { name: 'Php', icon: <Php /> },
  // { name: 'C', icon: <C /> },
  { name: 'Go', icon: <Go /> },
  {
    name: 'C#',
    icon: <CSharp />,
    link: 'https://github.com/codengo-llc/C-Sharp-starter',
  },
  {
    name: 'Java',
    icon: <Java />,
    link: 'https://github.com/codengo-llc/java-starter',
  },
]

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
  border-radius: 10px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin-bottom: 0;
  height: auto;
  width: 50vw;

  @media (max-width: 1366px) {
    width: 80vw;
    height: auto;
  }
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
  justify-content: center;
  align-items: center;
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
  width: 5vw;
  height: 5vw;
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
  width: 100%;
  min-width: 70px;
  max-width: 150px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 1vh;
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
  font-size: 1.4rem;
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
  width: 25%;
  border-top: 1px solid #0072ce;
`

const SectionDividerText = styled(Title)`
  width: 50%;
  margin: 0.5vh;
`

const GithubLinkInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: #0072ce;
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-align: center;
  font-size: 1rem;
  padding: 0.5vh 0;
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
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.7vh;
  color: #0072ce;
  cursor: pointer;

  :focus {
    outline: none;
  }
`

const Templates = ({ closeModal }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const repoError = useSelector(selectors.getError('myProjects'))

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

  const handleClick = item => {
    createProject({
      repoLink: item.link,
      dispatch: dispatch,
      user: user,
    })
  }

  return (
    <AddProjectWrapper>
      <StyledIcon type="close" onClick={closeModal} />
      <Title>Add project from github repository</Title>
      <Formik
        onSubmit={(values, actions) => {
          createProject({
            repoLink: values.repoLink.replace(/.git$/, ''),
            dispatch,
            user,
          })
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
              placeholder={'Paste repository link here'}
            />
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
            <Button
              disabled={!props.values.repoLink || props.errors.repoLink}
              primary
              type="submit"
              style={{ width: '20%' }}
            >
              Add project
            </Button>
          </GithubLinkForm>
        )}
      />
      <SectionDivider>
        <SectionDividerLine />
        <SectionDividerText>Or try out one of the templates</SectionDividerText>
        <SectionDividerLine />
      </SectionDivider>
      <ComponentWrapper>
        <TemplatesWrapper>
          {templates.map(item => (
            <TemplateContainer
              key={item.name}
              onClick={() => handleClick(item)}
            >
              <IconContainer>{item.icon}</IconContainer>
              <TemplateText>{item.name}</TemplateText>
            </TemplateContainer>
          ))}
        </TemplatesWrapper>
        <Button>More templates</Button>
      </ComponentWrapper>
    </AddProjectWrapper>
  )
}
export default Templates
