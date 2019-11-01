import {ApolloClient, ApolloLink, HttpLink} from 'apollo-boost';
import {resolvers, typeDefs} from './resolvers';

export function getApolloClient(authToken: string, cache: any) {
  const url = 'https://merciful-grass-v7r1ruytwj6z.vapor-farm-a1.com/graphql';

  const httpLink = new HttpLink({
    uri: url,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : null,
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
