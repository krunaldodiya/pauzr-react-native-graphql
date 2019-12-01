import {ApolloProvider} from '@apollo/react-hooks';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {offixClient} from '../../src/graphql/offix';
import InitialScreen from '../../src/screens/InitialScreen';

const App = () => {
  const [apolloClient, setApolloClientClient] = useState();

  useEffect(() => {
    offixClient.init().then((apolloClient: any) => {
      setApolloClientClient(apolloClient);
    });
  }, []);

  if (!apolloClient) {
    return (
      <ActivityIndicator
        size="small"
        color="black"
        style={{flex: 1, justifyContent: 'center'}}
      />
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <InitialScreen />
    </ApolloProvider>
  );
};

export default React.memo(App);
