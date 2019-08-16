import React, { memo } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'gatsby'

import { selectors } from 'state'
import { templates } from 'constants'
import AddProjectProvider from 'components/addProjectProvider'
import Layout from './layout'
import SEO from './seo'

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
  border-radius: 5px;
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

const Templates = ({ addProject }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)

  const handleClick = item => addProject(item.link)

  return (
    <Layout>
      <SEO title="Templates" />
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
        <StyledLink to="templates">More templates</StyledLink>
      </ComponentWrapper>
    </Layout>
  )
}
export default memo(
  <AddProjectProvider>
    {({ addProject }) => <Templates addProject={addProject} />}
  </AddProjectProvider>
)
