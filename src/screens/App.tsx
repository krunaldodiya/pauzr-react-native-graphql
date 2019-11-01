import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {cache} from '../graphql/cache';
import {getApolloClient} from '../graphql/client';
import {PersistGate} from '../graphql/gate';
import getStackNavigator from '../libs/route';
import {GET_AUTH_TOKEN, GET_INITIAL_SCREEN} from '../graphql/query';

const {token}: any = cache.readQuery({query: GET_AUTH_TOKEN});
const {initialScreen}: any = cache.readQuery({query: GET_INITIAL_SCREEN});

const client = getApolloClient(token, cache);

const App = () => {
  const AppNavigator = getStackNavigator(initialScreen);
  const AppContainer = createAppContainer(AppNavigator);

  return (
    <ApolloProvider client={client}>
      <PersistGate client={client}>
        <AppContainer />
      </PersistGate>
    </ApolloProvider>
  );
};

export default React.memo(App);
