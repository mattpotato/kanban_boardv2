import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_LINK
      ? process.env.REACT_APP_API_LINK
      : "http://localhost:4000/graphql",
    credentials: "include",
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_API_WSLINK
      ? process.env.REACT_APP_API_WSLINK
      : "ws://localhost:4000/graphql",
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        TaskList: {
          fields: {
            tasks: {
              merge(_existing, incoming) {
                return [...incoming];
              },
            },
          },
        },
      },
    }),
    credentials: "include",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Provider;
