import React, {useCallback} from 'react';
import {Icon} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Feeds from './fun/feeds';
import LotteryWinners from './fun/lottery_winners';
import Notifications from './fun/notifications';
import PublicProfile from './fun/public_profile';
import Search from './fun/search';

const FunTabNavigator = createBottomTabNavigator(
  {
    Feeds: {
      screen: Feeds,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="EvilIcons"
            name="camera"
            style={{color: tintColor, fontSize: 36}}
          />
        ),
      },
    },
    Lottery: {
      screen: LotteryWinners,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="EvilIcons"
            name="trophy"
            style={{color: tintColor, fontSize: 36}}
          />
        ),
      },
    },
    Profile: {
      screen: PublicProfile,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="EvilIcons"
            name="user"
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
            type="EvilIcons"
            name="search"
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
            type="EvilIcons"
            name="heart"
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
    initialRouteName: 'Profile',
  },
);

const HeaderRight = (navigation: any) => {
  const knowMore = useCallback(() => navigation.push('Profile'), []);

  return (
    <Icon
      type="SimpleLineIcons"
      name="bulb"
      style={{marginRight: 10, fontSize: 22}}
      onPress={knowMore}
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
        headerRight: <HeaderRight navigation={navigation} />,
      };
    },
  },
);

export default FunStackNavigator;
