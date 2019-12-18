import {useQuery} from '@apollo/react-hooks';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {createAppContainer} from 'react-navigation';
import {GetConfig, GetConfigVariables} from '../../src/generated/GetConfig';
import get_config from '../../src/graphql/types/queries/get_config';
import getStackNavigator from '../../src/libs/route';

const InitialScreen = () => {
  const device_id = DeviceInfo.getUniqueId();

  const {data: config} = useQuery<GetConfig, GetConfigVariables>(get_config, {
    fetchPolicy: 'cache-and-network',
    variables: {
      device_id,
    },
  });

  if (!config) {
    return (
      <ActivityIndicator
        size="small"
        color="black"
        style={{flex: 1, justifyContent: 'center'}}
      />
    );
  }

  const AppNavigator = getStackNavigator(config?.getConfig?.initial_screen);
  const AppContainer = createAppContainer(AppNavigator);

  return <AppContainer />;
};

export default InitialScreen;
