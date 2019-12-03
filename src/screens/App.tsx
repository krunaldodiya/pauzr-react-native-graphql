import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import {client} from '../../src/graphql/client';
import InitialScreen from '../../src/screens/InitialScreen';
import QueueLink from 'apollo-link-queue';
import NetInfo from '@react-native-community/netinfo';

const queueLink = new QueueLink();

const App = () => {
  NetInfo.addEventListener('connectionChange', connectionInfo => {
    if (!connectionInfo) {
      queueLink.open();
    } else {
      queueLink.close();
    }
  });

  return (
    <ApolloProvider client={client}>
      <InitialScreen />
    </ApolloProvider>
  );
};

export default React.memo(App);
