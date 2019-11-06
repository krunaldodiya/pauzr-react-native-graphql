import React, {useCallback} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Groups from './focus/groups';
import Scoreboard from './focus/scoreboard';
import Timer from './focus/timer';

const DrawerMenu = (props: any) => {
  const onPress = useCallback(() => console.log('props', props), []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 10}}>
        <TouchableOpacity onPress={onPress}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const FocusTabNavigator = createBottomTabNavigator(
  {
    Groups: {
      screen: Groups,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="ionicons"
            name="person"
            style={{color: tintColor, fontSize: 28}}
          />
        ),
      },
    },
    Timer: {
      screen: Timer,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="ionicons"
            name="pause"
            style={{color: tintColor, fontSize: 28}}
          />
        ),
      },
    },
    Scoreboard: {
      screen: Scoreboard,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            type="ionicons"
            name="lock"
            style={{color: tintColor, fontSize: 28}}
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
    initialRouteName: 'Timer',
  },
);

const HeaderLeft = (navigation: any) => {
  const openDrawer = useCallback(() => navigation.openDrawer(), []);

  return (
    <Icon
      type="SimpleLineIcons"
      name="menu"
      style={{fontSize: 22}}
      iconStyle={{marginLeft: 10}}
      onPress={openDrawer}
    />
  );
};

const HeaderRight = (navigation: any) => {
  const knowMore = useCallback(() => navigation.push('Home'), []);

  return (
    <Icon
      type="SimpleLineIcons"
      name="lightbulb-outline"
      style={{fontSize: 22}}
      iconStyle={{marginRight: 10}}
      onPress={knowMore}
    />
  );
};

const FocusStackNavigator = createStackNavigator(
  {
    FocusTabNavigator: FocusTabNavigator,
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: <HeaderLeft navigation={navigation} />,
        title: navigation.state.routes[navigation.state.index].routeName,
        headerRight: <HeaderRight navigation={navigation} />,
      };
    },
  },
);

const FocusDrawerNavigator = createDrawerNavigator(
  {
    Main: FocusStackNavigator,
  },
  {
    contentComponent: DrawerMenu,
  },
);

export default FocusDrawerNavigator;
