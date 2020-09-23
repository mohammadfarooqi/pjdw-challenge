import React, { Component, useContext, useState } from 'react';
import AuthContext from '../context/auth-context';
import { gql, useQuery } from '@apollo/client';
import { Col, Container, Row } from 'reactstrap';

// display a list of users with pagination
// display a list of products the user owns

const GET_ALL_USERS = gql`
  query GetAllUsers {
    users(first) {
      id
      firstName
      lastName
      email
    }
  }
`;

function DashboardPage() {
  const auth = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error {JSON.stringify(error)}</p>;

  // return <p>{data.users.map(user => <p>{user.firstName}</p>)}!</p>;
  return (
    <Container className="mx-auto my-5">
      {data && data.users && data.users.map(user => (
        <Row key={user.id}>
          <Col>
            <p>{user.firstName} {user.lastName}</p>
          </Col>
        </Row>
      ))
      }
    </Container>
  );
}

export default DashboardPage;