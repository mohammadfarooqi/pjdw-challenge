import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const httpLink = new HttpLink({ 
  uri: 'http://localhost:4000/graphql',
  headers: {
    'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
