import React from 'react';
import {createAppContainer} from 'react-navigation';
import {GET_INITIAL_SCREEN} from '../graphql/query';
import getStackNavigator from '../libs/route';
import {View} from 'react-native';

const OffixProvider = (props: any) => {
  const {client} = props;

  console.log(client);

  const data = client.readQuery({query: GET_INITIAL_SCREEN});

  console.log(data);

  return <View />;

  // const AppNavigator = getStackNavigator(data.initialScreen);
  // const AppContainer = createAppContainer(AppNavigator);

  // return <AppContainer />;
};

export default OffixProvider;
