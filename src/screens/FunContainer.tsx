import React, {useCallback} from 'react';
import ActionSheet from 'react-native-action-sheet';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import screens from '../libs/screens';
import {pickerSettings} from '../libs/vars';
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
  const createFeed = async () => {
    const options = ['PHOTO', 'VIDEO', 'GALLERY'];

    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 3,
        destructiveButtonIndex: 4,
        tintColor: 'blue',
      },
      async (buttonIndex: number) => {
        switch (buttonIndex) {
          case 0:
            ImagePicker.openCamera(pickerSettings.capturePhoto)
              .then((image: any) => {
                props.navigation.push(screens.CreatePost, {files: [image]});
              })
              .catch(e => {
                console.log(e);
              });
            break;

          case 1:
            ImagePicker.openCamera(pickerSettings.recordVideo)
              .then((image: any) => {
                props.navigation.push(screens.CreatePost, {files: [image]});
              })
              .catch(e => {
                console.log(e);
              });
            break;

          case 2:
            ImagePicker.openPicker(pickerSettings.galleryFiles)
              .then((image: any) => {
                console.log(image);

                props.navigation.push(screens.CreatePost, {files: image});
              })
              .catch(e => {
                console.log(e);
              });
            break;

          default:
            break;
        }
      },
    );
  };

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
