import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {cache} from '../graphql/cache';
import {getApolloClient} from '../graphql/client';
import {PersistGate} from '../graphql/gate';
import {GET_AUTH_USER} from '../graphql/query';
import getStackNavigator from '../libs/route';

const {user}: any = cache.readQuery({query: GET_AUTH_USER});

const client = getApolloClient(user.token, cache);

const App = () => {
  const AppNavigator = getStackNavigator(user.initialScreen);
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
