import React, {useCallback} from 'react';
import ActionSheet from 'react-native-action-sheet';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import RNThumbnail from 'react-native-thumbnail';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import screens from '../libs/screens';
import {pickerSettings} from '../libs/vars';
import Bazaar from './fun/Bazaar';
import Conversation from './fun/Conversation';
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
    Conversation: {
      screen: Conversation,
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
  const browseCreateFeed = async (files: any[]) => {
    const data = Promise.all(
      files.map(async file => {
        const isVideo = file.mime.includes('video');
        delete file['modificationDate'];

        if (isVideo) {
          const data = await RNThumbnail.get(file.path);

          return {...file, thumbnail: data.path};
        } else {
          return {...file, thumbnail: file.path};
        }
      }),
    );

    data.then((files: any) => {
      props.navigation.push(screens.CreatePost, {files});
    });
  };

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
              .then((files: any) => {
                browseCreateFeed([files]);
              })
              .catch(e => {
                console.log(e);
              });
            break;

          case 1:
            ImagePicker.openCamera(pickerSettings.recordVideo)
              .then((files: any) => {
                browseCreateFeed([files]);
              })
              .catch(e => {
                console.log(e);
              });
            break;

          case 2:
            ImagePicker.openPicker(pickerSettings.galleryFiles)
              .then((files: any) => {
                browseCreateFeed(files);
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
    // props.navigation.push(screens.Profile);
    props.navigation.push(screens.ProfileEdit); // temp for fast debug
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
