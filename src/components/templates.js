import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'gatsby'

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

const StyledLink = styled(Link)`
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
  opacity: 0.9;

  :focus {
    outline: 0;
  }

  cursor: pointer;
  &:hover {
    opacity: 1;
    box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
    transform: translateY(-1px);
  }
`

const Templates = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  const handleClick = item => {
    createProject({
      repoLink: item.link,
      dispatch: dispatch,
      user: user,
    })
  }

  return (
    <ComponentWrapper>
      <TemplatesWrapper>
        {templates.map(item => (
          <TemplateContainer key={item.name} onClick={() => handleClick(item)}>
            <IconContainer>{item.icon}</IconContainer>
            <TemplateText>{item.name}</TemplateText>
          </TemplateContainer>
        ))}
      </TemplatesWrapper>
      <StyledLink to="templates">More templates</StyledLink>
    </ComponentWrapper>
  )
}
export default Templates
