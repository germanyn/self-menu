import {HttpLink} from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3456/graphql',
  fetch,
});

export const graphQLClient = new ApolloClient({
  link,
  cache,
});