import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { Formik } from 'formik'
import Modal from 'react-modal'

import Layout from './layout'
import SEO from './seo'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { query, mutation } from 'utils'
import { GET_PROJECTS, DELETE_PROJECT, CONTINUE_PROJECT } from 'queries'
import * as C from 'state/currentProject/constants'
import * as ApiC from 'state/api/constants'
import { selectors } from 'state'
import { createProject } from 'utils'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const FadeIn = keyframes`
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
  align-items: center;
`

const PageWrapper = styled(Wrapper)`
  width: 100vw;
`

const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vh;
  margin: 2vh;
  animation: ${FadeIn} 1s ease-out;
`

const Tile = styled.div`
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
  margin: 15px;
  height: 25vh;
  width: 50vw;

  @media (max-width: 1366px) {
    width: 80vw;
    height: auto;
  }
`

const AddProjectWrapper = styled(Tile)`
  width: 50vw;
  margin-top: 5vh;
  height: auto;
  margin-bottom: 0;
`

const Button = styled(Link)`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
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
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const DeleteButton = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
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
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
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
  font-size: 2vh;
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

const ProjectTitle = styled.h1`
  font-size: 3vh;
  color: #0072ce;
  margin: 0.3vh 0.3vh 0.3vh 0;
`

const Text = styled.p`
  color: #0072ce;
  font-size: 1.7vh;
  margin-left: 2%;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.3vh;
  margin: 0;
`

const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const RightSection = styled(FlexWrapper)`
  width: 20%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5%;
`

const InfoWrapper = styled(FlexWrapper)`
  width: 80%;
  align-items: flex-start;
`

const TextWrapper = styled(FlexWrapper)`
  flex-direction: row;
  margin-top: 0.3vh;
  margin-bottom: 0.3vh;
  width: 90%;
  height: auto;
  justify-content: flex-start;
`

const StyledIcon = styled(Icon)`
  font-size: 1.7vh;
  color: #0072ce;
`

const validate = values => {
  let errors = {}

  if (!values.githubLink) {
    errors.githubLink = 'You need to provide repository link to add project'
  } else if (
    !/.*github.com\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+/i.test(
      values.githubLink
    )
  ) {
    errors.githubLink = 'Invalid repository link'
  }

  return errors
}

const Dashboard = () => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.getUserProjects)
  const user = useSelector(selectors.getUser)
  const [isModalVisible, setModalVisible] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const repoError = useSelector(selectors.getError('myProjects'))

  const handleStartClick = ({ id, editorPort, previewPort, machineId }) => {
    if (!editorPort) {
      dispatch(
        mutation({
          name: 'continueProject',
          mutation: CONTINUE_PROJECT,
          variables: { projectId: id, machineId },
          onSuccessDispatch: [
            ({ id, editorPort, previewPort, machineId }) => ({
              type: C.SELECT_CURRENT_PROJECT,
              payload: { id, editorPort, previewPort, machineId },
            }),
          ],
        })
      )
    } else {
      dispatch({
        type: C.SELECT_CURRENT_PROJECT,
        payload: { id, editorPort, previewPort, machineId },
      })
    }
  }

  const handleDeleteClick = ({ id, machineId }) => {
    dispatch(
      mutation({
        name: 'deleteProject',
        mutation: DELETE_PROJECT,
        variables: { projectId: id, machineId },
        dataSelector: data => data,
        onSuccessDispatch: [
          () => ({
            type: ApiC.REMOVE_ITEM,
            payload: { storeKey: 'myProjects', id },
          }),
          () => ({
            type: ApiC.FETCH_SUCCESS,
            payload: { storeKey: 'deleteProject', data: true },
          }),
        ],
      })
    )
  }

  useEffect(() => {
    dispatch(
      query({
        name: 'myProjects',
        dataSelector: data => data.myProjects.edges,
        query: GET_PROJECTS,
      })
    )
  }, [])

  return (
    <Layout>
      <SEO title="Dashboard" />
      <PageWrapper>
        <AddProjectWrapper>
          <ProjectTitle>Add project from github repository</ProjectTitle>
          <Formik
            style={{ width: '100%', height: '100%' }}
            onSubmit={(values, actions) => {
              createProject({
                githubLink: values.githubLink,
                dispatch: dispatch,
                user: user,
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
                  value={props.values.githubLink}
                  name="githubLink"
                  placeholder={
                    props.errors.githubLink
                      ? props.errors.githubLink
                      : 'Paste repository link here'
                  }
                />
                {repoError &&
                  repoError.message &&
                  repoError.message.includes(
                    'Could not resolve to a Repository'
                  ) && (
                    <ErrorMessage>
                      Provided link leads to a private repository
                    </ErrorMessage>
                  )}
                <DeleteButton primary type="submit" style={{ width: '20%' }}>
                  Add project
                </DeleteButton>
              </GithubLinkForm>
            )}
          />
        </AddProjectWrapper>
        <TilesWrapper>
          {projects.map(project => (
            <Tile key={project.id}>
              <VerticalDivider>
                <InfoWrapper>
                  <ProjectTitle>{project.name}</ProjectTitle>
                  <TextWrapper>
                    <StyledIcon type="calendar" />
                    <Text>{project.createdAt}</Text>
                  </TextWrapper>
                  <TextWrapper>
                    <StyledIcon type="edit" />
                    <Text>
                      {project.description
                        ? project.description
                        : 'This is the project description.. Tribute'}
                    </Text>
                  </TextWrapper>
                  {/* <TextWrapper>
                  <StyledIcon
                    type="branches"
                  />
                  <Text> {project.branch}</Text>
                </TextWrapper>
                <TextWrapper>
                  <StyledIcon
                    type="code"
                  />
                  <Text>{project.language}</Text>
                </TextWrapper> */}
                  <TextWrapper>
                    <StyledIcon type={project.isPrivate ? 'lock' : 'unlock'} />
                    <Text>{project.isPrivate ? 'Private' : 'Public'}</Text>
                  </TextWrapper>
                </InfoWrapper>
                <RightSection>
                  <Button
                    to="/app/editor/"
                    primary
                    onClick={() => handleStartClick(project)}
                  >
                    Start
                  </Button>
                  <DeleteButton onClick={() => setModalVisible(true)}>
                    Delete
                  </DeleteButton>
                </RightSection>
              </VerticalDivider>
            </Tile>
          ))}
        </TilesWrapper>
      </PageWrapper>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={setModalVisible}
        style={modalStyles}
        contentLabel="Are you sure you want to delete this project?"
      >
        <button
          onClick={() => {
            setModalVisible(false)
          }}
        >
          close
        </button>
        <div>I am a modal</div>
        <form>
          <input />
          <button
            onClick={() => {
              handleDeleteClick(projectToDelete)
              setProjectToDelete()
              setModalVisible(false)
            }}
          >
            Confirm
          </button>
          <button onClick={() => setProjectToDelete()}>Confirm</button>
        </form>
      </Modal>
    </Layout>
  )
}

export default Dashboard
