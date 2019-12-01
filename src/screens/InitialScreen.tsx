import {useQuery} from '@apollo/react-hooks';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {GET_INITIAL_SCREEN} from 'src/graphql/query';
import getStackNavigator from 'src/libs/route';

const InitialScreen = () => {
  const {data} = useQuery(GET_INITIAL_SCREEN, {
    fetchPolicy: 'cache-only',
  });

  const AppNavigator = getStackNavigator(data.initialScreen);
  const AppContainer = createAppContainer(AppNavigator);

  return <AppContainer />;
};

export default InitialScreen;
