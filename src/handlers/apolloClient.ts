import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:8080/api/graphql/", // Pointing to Nginx reverse proxy
  cache: new InMemoryCache(),
});

export default apolloClient;
