import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import {cache} from '../graphql/cache';
import {getApolloClient} from '../graphql/client';
import {PersistGate} from '../graphql/gate';
import {Root} from './Root';

export const client = getApolloClient(cache);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <PersistGate client={client}>
        <Root />
      </PersistGate>
    </ApolloProvider>
  );
};

export default React.memo(App);
