import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {cache} from '../graphql/cache';
import {getApolloClient} from '../graphql/client';
import {PersistGate} from '../graphql/gate';
import {GET_INITIAL_SCREEN} from '../graphql/query';
import getStackNavigator from '../libs/route';

export const client = getApolloClient(cache);

const App = () => {
  const data = client.readQuery({query: GET_INITIAL_SCREEN});
  // const AppNavigator = getStackNavigator(data.initialScreen);

  // temp for debug:
  const AppNavigator = getStackNavigator('Feeds');

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
