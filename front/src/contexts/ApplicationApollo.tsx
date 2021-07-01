import React from 'react'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { useAutenticacao } from './autenticacao';
import { setContext } from '@apollo/client/link/context';

// import { TypedTypePolicies } from '../generated/graphql';


// const typePolicies: TypedTypePolicies = {
//     Query: {
//         fields: {
//             produto(_, { args, toReference }) {
//                 if (!args) return
//                 return toReference({
//                     __typename: 'Produto',
//                     id: args._id,
//                 })
//             }
//         }
//     }
// }

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
      cache: new InMemoryCache({
        //   typePolicies,
      }),
    });
    return (
        <ApolloProvider client={client}>
            { props.children }
        </ApolloProvider>
    )
}

export default ApplicationApollo
