import gql from 'graphql-tag'
import { OrganizationFragment } from './fragments/organization'

export default gql`
    mutation MyOrganizations(){
        myOrganizations(){
            ...Organization
        }
    }
    ${OrganizationFragment}
`
