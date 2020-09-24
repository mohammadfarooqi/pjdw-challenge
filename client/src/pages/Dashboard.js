import React, { Component, useContext, useEffect, useState } from 'react';
import AuthContext from '../context/auth-context';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { Col, Container, Row, Button, Table, CardDeck } from 'reactstrap';
import UsersTable from '../components/UserTable/UserTable';
import ProductCard from '../components/ProductCard/ProductCard';
// display a list of users with pagination
// display a list of products the user owns

const GET_ALL_USERS = gql`
  query GetAllUsers($first: Int!, $skip: Int!) {
    users(first: $first, skip: $skip) {
      id
      firstName
      lastName
      email
    }
  }
`;

const GET_ALL_PRODUCTS_FOR_USER = gql`
  query GetAllProductsForUser($id: ID) {
    getAllProductsForUser(id: $id) {
      id
      name
      description
      price
      image
    }
  }
`;

function DashboardPage() {
  const auth = useContext(AuthContext);

  const [skip, setSkip] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_USERS, {
    variables: { skip, first: 1 }
  });

  const [
    getProductsQuery,
    { called, loading: loadingProducts, error: errorProducts, data: dataProducts, client }
  ] = useLazyQuery(GET_ALL_PRODUCTS_FOR_USER);

  useEffect(() => {
    // console.log('skip', skip);
    fetchMore({
      variables: {
        skip,
        first: 1
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        // console.log('prevResult', prevResult)
        // console.log('fetchMoreResult', fetchMoreResult)
        if (!fetchMoreResult) return prevResult;

        setUsers([...users, ...fetchMoreResult.users])

        return Object.assign({}, prevResult, {
          users: [...prevResult.users, ...fetchMoreResult.users]
        });
      }
    });
  }, [skip]);


  if (error) return <p>Error {JSON.stringify(error)}</p>;
  if (loading && users.length == 0) return (
    <Container className="mx-auto my-5">
      <Row>
        <Col>
          <p>Loading Users...</p>
        </Col>
      </Row>
    </Container>
  );

  const columns = ['ID', 'First Name', 'Last Name', 'Email', ''];

  const fetchProducts = (user) => {
    // console.log('c', user);
    getProductsQuery({
      variables: { id: user.id }
    });
    setSelectedUser(user);
  }

  const renderProducts = (products) => {
    // console.log('p', products);

    const rows = [...Array( Math.ceil(products.length / 3) )];
    // console.log('rows', rows);

    const productRows = rows.map( (row, i) => products.slice(i * 3, i * 3 + 3) );
    // console.log('product.rows', productRows);

    const content = productRows.map((row, i) => (
      <Row className="my-3">
        <Col>
          <CardDeck>
            {row.map((product, idx) => <ProductCard key={`${idx}${product.id}`} product={product} />)}
          </CardDeck>
        </Col>
      </Row>
    ));

    // console.log('content', content);
    return content;
  }

  return (
    <Container className="mx-auto my-5">
      <Row className="mb-3">
        <Col>
          <h3>List of Users</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <UsersTable columns={columns} rows={users} fetchProducts={fetchProducts} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setSkip(skip + 1)} disabled={data && data.users.length == 0}>Next</Button>
        </Col>
      </Row>
      {selectedUser && (
        <>
          <Row className="my-5">
            <Col>
              <h3>Products for {selectedUser.firstName} {selectedUser.lastName}</h3>
            </Col>
          </Row>
          {dataProducts && dataProducts.getAllProductsForUser && dataProducts.getAllProductsForUser.length > 0 ? 
            renderProducts(dataProducts.getAllProductsForUser) 
            :
            <Row>
              <Col>
                <p>No products found</p>
              </Col>
            </Row>
          }
        </>
      )}
    </Container>
  );
}



export default DashboardPage;