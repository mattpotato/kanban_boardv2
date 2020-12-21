import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache({}),
    credentials: "include",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Provider;
