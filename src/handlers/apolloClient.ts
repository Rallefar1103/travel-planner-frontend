import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: "http://localhost:9000/graphql"
});

const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;