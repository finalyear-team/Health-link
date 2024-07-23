import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    // uri: "http://localhost:4000/graphql",
    uri: '/api',
    // credentials: "include",
  }),

  cache: new InMemoryCache({}),
});

export default client;

