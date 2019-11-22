import {ApolloProvider, useSubscription} from '@apollo/react-hooks';
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {getApolloClient} from '../graphql/client';
import {PersistGate} from '../graphql/gate';
import {GET_INITIAL_SCREEN} from '../graphql/query';
import test_subscription from '../graphql/types/subscriptions/test_subscription';
import getStackNavigator from '../libs/route';

export const client = getApolloClient();

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

    const subscription = useSubscription(test_subscription);
    console.log(subscription);

    return <AppContainer />;
  };

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <PersistGate client={client}>
          <Main />
        </PersistGate>
      </ApolloProvider>
    </React.StrictMode>
  );
};

export default React.memo(App);
