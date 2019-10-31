import {ApolloClient, ApolloLink, HttpLink} from 'apollo-boost';
import {resolvers, typeDefs} from './resolvers';

export function getApolloClient(authToken: string, cache: any) {
  const url = 'https://pauzr-graphql.herokuapp.com/v1/graphql';

  const httpLink = new HttpLink({
    uri: url,
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'krunal@1987',
    },
  });

  const link = ApolloLink.from([httpLink]);

  const client = new ApolloClient({
    link,
    cache,
    resolvers,
    typeDefs,
  });

  return client;
}
