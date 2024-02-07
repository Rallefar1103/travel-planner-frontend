import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://graphql-server:9000",
  cache: new InMemoryCache(),
});

export default apolloClient;
