import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import offixClient from '../../src/graphql/offix';
import InitialScreen from '../../src/screens/InitialScreen';

const App = () => {
  return (
    <ApolloProvider client={offixClient}>
      <InitialScreen />
    </ApolloProvider>
  );
};

export default React.memo(App);
