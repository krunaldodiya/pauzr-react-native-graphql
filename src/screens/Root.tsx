import React from 'react';
import {createAppContainer} from 'react-navigation';
import {GET_AUTH_USER} from '../graphql/query';
import getStackNavigator from '../libs/route';
import {client} from './App';

export const Root = () => {
  const data = client.readQuery({query: GET_AUTH_USER});

  const AppNavigator = getStackNavigator(data.user.initialScreen);
  const AppContainer = createAppContainer(AppNavigator);

  return <AppContainer />;
};
