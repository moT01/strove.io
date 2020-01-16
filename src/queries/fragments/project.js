import gql from 'graphql-tag'

export const ProjectFragment = gql`
  fragment Project on Project {
    id
    name
    description
    isPrivate
    createdAt
    repoLink
    machineId
    editorPort
    additionalPorts
    machineName
    isVisible
    teamId
    forkedFromId
  }
`
