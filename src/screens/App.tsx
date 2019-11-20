import {ApolloProvider} from '@apollo/react-hooks';
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {cache} from '../graphql/cache';
import {getApolloClient} from '../graphql/client';
import {PersistGate} from '../graphql/gate';
import {GET_INITIAL_SCREEN} from '../graphql/query';
import getStackNavigator from '../libs/route';
export const client = getApolloClient(cache);

const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const Main = () => {
    const data = client.readQuery({query: GET_INITIAL_SCREEN});
    const AppNavigator = getStackNavigator(data.initialScreen);
    const AppContainer = createAppContainer(AppNavigator);

    return <AppContainer />;
  };

  return (
    <ApolloProvider client={client}>
      <PersistGate client={client}>
        <Main />
      </PersistGate>
    </ApolloProvider>
  );
};

export default React.memo(App);
