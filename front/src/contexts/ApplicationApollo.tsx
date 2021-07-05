import React from 'react'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { useAutenticacao } from './autenticacao';
import { setContext } from '@apollo/client/link/context';

const ApplicationApollo: React.FC = (props) => {
    const { token } = useAutenticacao()
    const httpLink = createHttpLink({
        uri: '/graphql',
    });
    
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
    return (
        <ApolloProvider client={client}>
            { props.children }
        </ApolloProvider>
    )
}

export default ApplicationApollo
