import {ApolloProvider} from '@apollo/react-hooks';
import NetInfo from '@react-native-community/netinfo';
import Echo from 'laravel-echo';
import PusherNative from 'pusher-js/react-native';
import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {getApolloClient} from '../graphql/client';
import {PersistGate} from '../graphql/gate';
import {GET_INITIAL_SCREEN} from '../graphql/query';
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

    // const httpHost = 'https://graphql.pauzr.com';
    const wsHost = 'https://graphql.pauzr.com';
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ3JhcGhxbC5wYXV6ci5jb21cL2dyYXBocWwiLCJpYXQiOjE1NzQ4NjExMzMsImV4cCI6MTYwNjM5NzEzMywibmJmIjoxNTc0ODYxMTMzLCJqdGkiOiJsanZGWlI2VWVvM1NNN1BOIiwic3ViIjoiNDNlMjYzNGQtZDI4NC00NGZiLWIwMWUtMDRhODA1YjlmYjQ3IiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.5jrqMYUj8NUKjgsZgo4E2PXRiwhAsYRrbwSygrk1fi4';

    const options = {
      broadcaster: 'pusher',
      key: 'abd0716eddc0702f68a4',
      cluster: 'ap2',
      encrypted: true,
      logToConsole: true,
      wsHost: wsHost,
      wsPort: 6001,
      authEndpoint: `/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    };

    let PusherClient = new PusherNative(options.key, options);

    const echo = new Echo({
      broadcaster: 'pusher',
      client: PusherClient,
      ...options,
    });

    echo
      .channel('private-chat')
      .listen('App\\Events\\TestEvent', (data: any) => {
        console.log(data, 'data');
      });

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
