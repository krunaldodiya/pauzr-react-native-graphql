import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {cache} from '../graphql/cache';
import {getApolloClient} from '../graphql/client';
import {PersistGate} from '../graphql/gate';
import getStackNavigator from '../libs/route';

const authToken: string = '';
const initialScreen: string = '';

const client = getApolloClient(authToken, cache);

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
