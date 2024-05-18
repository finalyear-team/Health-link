import { gql } from '@apollo/client';


export const GET_USER=gql`
  query 
`


export const GET_ALL_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
