import React, {useCallback} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Groups from './focus/Groups';
import Scoreboard from './focus/Scoreboard';
import Timer from './focus/Timer';
import {width, U, u} from '../libs/vars';

import ss, {fontColor} from './DrawerStyle';

// todo split to file
const DrawerMenu = (props: any) => {
  // const onPress = useCallback(() => console.log('props', props), []);

  const labels = [
    // todo its just dummy fast sample
    {title: 'friends', iconName: 'user', iconType: 'font-awesome'},
    {title: 'favorites', iconName: 'favorite'},
    {title: 'friends', iconName: 'sc-vk', iconType: 'evilicon'},
    {title: 'friends', iconName: 'user', iconType: 'font-awesome'},
    {title: 'favorites', iconName: 'favorite'},
    {title: 'friends', iconName: 'sc-vk', iconType: 'evilicon'},
    {title: 'friends', iconName: 'user', iconType: 'font-awesome'},
    {title: 'favorites', iconName: 'favorite'},
    {title: 'friends', iconName: 'sc-vk', iconType: 'evilicon'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={ss.mainContainer}>
        <Image
          source={{uri: 'https://picsum.photos/id/13/500/500'}}
          containerStyle={ss.avatar}
        />
        <Text style={ss.name}>Kolya Avidov</Text>

        {/* todo or scroll with avatar too? */}
        <ScrollView
          style={ss.mainLabelsScroll}
          contentContainerStyle={ss.mainLabelsContainer}>
          {labels.map(label => (
            <TouchableOpacity style={ss.label}>
              <Icon
                name={label.iconName}
                type={label.iconType}
                color={fontColor}
                size={2 * 0.64 * U}
                containerStyle={ss.label__icon}
              />
              <Text style={ss.label__text}>{label.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* <View style={{flex: 1}}/> */}
        {/* <View style={{height: 4 * U}}/> */}
        <View style={ss.divider} />

        <TouchableOpacity style={ss.label}>
          <Icon
            name="sc-telegram"
            type="evilicon"
            color={fontColor}
            size={2 * 0.64 * U}
            containerStyle={ss.label__icon}
          />
          <Text style={ss.label__text}>settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ss.label}>
          <Icon
            name="ios-share"
            type="ionicon"
            color={fontColor}
            size={2 * 0.64 * U}
            containerStyle={ss.label__icon}
          />
          <Text style={ss.label__text}>log-out</Text>
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

const HeaderLeft = (props: any) => {
  return (
    <Icon
      type="SimpleLineIcons"
      name="menu"
      style={{fontSize: 22}}
      iconStyle={{marginLeft: 10}}
      onPress={() => props.navigation.openDrawer()}
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
