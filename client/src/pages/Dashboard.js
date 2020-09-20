import React, { Component, useContext, useState } from 'react';
import AuthContext from '../context/auth-context';
import { gql, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// display a list of users with pagination
// display a list of products the user owns

const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

function DashboardPage () {
  const auth = useContext(AuthContext);
  const token = auth.token;
  console.log('t', token);

  
  
  // const authLink = setContext((_, { headers }) => {
  //   // get the authentication token from local storage if it exists
  //   // const token = localStorage.getItem('token');
  //   // return the headers to the context so httpLink can read them
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : "",
  //     }
  //   }
  // });
  
  const { loading, error, data, client } = useQuery(GET_ALL_USERS, {
    headers: { 
      authorization: token ? `Bearer ${token}` : "",
    }
  });
  
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error {JSON.stringify(error)}</p>;

  return <p>{data.users.map(user => <p>{user.firstName}</p>)}!</p>;
}

export default DashboardPage;