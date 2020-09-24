import React, { Component, useState, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Container, Row, Alert } from 'reactstrap';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import AuthContext from '../context/auth-context';

const LOGIN = gql`
  query LoginUser($email: String!) {
    login(email: $email) {
      user {
        id
        firstName
        lastName
        email
      }
      token
    }
  }
`;

function AuthPage() {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState('');

  const [
    loginQuery,
    { called, loading, error, data, client }
  ] = useLazyQuery(LOGIN, {
    variables: { email }
  });


  if (called && loading) return (
    <Container className="mx-auto my-5">
      <Row>
        <Col>
          <p>Logging in...</p>
        </Col>
      </Row>
    </Container>
  );
  // if (error) return <p>Error</p>
  if (error) client.clearStore();
  if (data && data.login) {
    // console.log(data.login);
    auth.login(data.login.token, data.login.user);
    // return (
    //   <h1>all good</h1>
    // );
  }

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value.trim())
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (email && email.length > 0) {
      // console.log('here', email, data?.user);
      loginQuery();
    }
  }

  return (
    <Container className="mx-auto my-5">
      {error && <Row>
        <Col>
          <Alert color="danger">Login Failed</Alert>
        </Col>
      </Row>}
      <Row>
        <Col>
          <Form onSubmit={submitHandler}>
            <FormGroup row>
              <Label for="email" sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="email" placeholder="john@smith.com" value={email} onChange={handleChange} />
              </Col>
            </FormGroup>
            <Button>Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthPage;