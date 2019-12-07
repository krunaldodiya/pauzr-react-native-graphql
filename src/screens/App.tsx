import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import {ApolloOfflineProvider} from 'react-offix-hooks';
import offixClient from '../../src/graphql/offix';
import InitialScreen from '../../src/screens/InitialScreen';

const App = () => {
  return (
    <ApolloOfflineProvider client={offixClient}>
      <ApolloProvider client={offixClient}>
        <InitialScreen />
      </ApolloProvider>
    </ApolloOfflineProvider>
  );
};

export default React.memo(App);
