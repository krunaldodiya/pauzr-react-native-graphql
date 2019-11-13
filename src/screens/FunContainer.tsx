import React, {useCallback} from 'react';
import {Icon} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import screens from '../libs/screens';
import Bazaar from './fun/Bazaar';
import Chat from './fun/Chat';
import Feeds from './fun/Feeds';
import Notifications from './fun/Notifications';
import Search from './fun/Search';

const FunTabNavigator = createBottomTabNavigator(
  {
    Feeds: {
      screen: Feeds,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="SimpleLineIcons"
            name="grid-on"
            style={{color: tintColor, fontSize: 36}}
          />
        ),
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="SimpleLineIcons"
            name="search"
            style={{color: tintColor, fontSize: 36}}
          />
        ),
      },
    },
    Bazaar: {
      screen: Bazaar,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="SimpleLineIcons"
            name="shop"
            style={{color: tintColor, fontSize: 36}}
          />
        ),
      },
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="SimpleLineIcons"
            name="message"
            style={{color: tintColor, fontSize: 36}}
          />
        ),
      },
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="SimpleLineIcons"
            name="favorite"
            style={{color: tintColor, fontSize: 36}}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'red',
    },
    initialRouteName: 'Bazaar',
  },
);

const HeaderLeft = (props: any) => {
  const createFeed = useCallback(() => {
    props.navigation.push(screens.Picker);
  }, []);

  return (
    <Icon
      type="SimpleLineIcons"
      name="add-a-photo"
      style={{fontSize: 22}}
      iconStyle={{marginLeft: 10}}
      onPress={createFeed}
    />
  );
};

const HeaderRight = (props: any) => {
  const userProfile = useCallback(() => {
    props.navigation.push(screens.Profile);
  }, []);

  return (
    <Icon
      type="SimpleLineIcons"
      name="person"
      style={{fontSize: 22}}
      iconStyle={{marginRight: 10}}
      onPress={userProfile}
    />
  );
};

const FunStackNavigator = createStackNavigator(
  {
    FunTabNavigator: FunTabNavigator,
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}: any) => {
      return {
        title: navigation.state.routes[navigation.state.index].routeName,
        headerLeft: <HeaderLeft navigation={navigation} />,
        headerRight: <HeaderRight navigation={navigation} />,
      };
    },
  },
);

export default FunStackNavigator;
