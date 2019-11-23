import React, {useEffect, Fragment} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import getAssets from '../../libs/image';
import {width, U, u} from '../../libs/vars'

const Notifications = (props: any) => {
  useEffect(() => {
    // dispatch.notification.getNotifications(null);
  }, []);

  const notifications: any = [
    {
      type: 'App\\Notifications\\UserFollowed',
      user: {avatar: '', name: 'Ali Alihab'},
      when: '27 hours ago',
    },
    {
      type: 'App\\Notifications\\PostLiked',
      user: {avatar: '', name: 'Ali Alihab'},
      when: '27 hours ago',
      post: {url: 'asd'}
    },
    {
      type: 'App\\Notifications\\PostLiked',
      user: {avatar: '', name: 'Ali Alihab'},
      when: '27 hours ago',
      post: {url: 'asd'}
    },
    {
      type: 'App\\Notifications\\PostLiked',
      user: {avatar: '', name: 'Ali Alihab'},
      when: '27 hours ago',
      post: {url: 'asd'}
    },
  ];

  const renderItem = (data: any) => {
    const {item} = data;

    return (
      <Fragment>
        <View style={ss.Notification}>
          {item.type == 'App\\Notifications\\UserFollowed' && (
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={ss.avatar}
                  source={{uri: 'https://picsum.photos/id/64/500/500'}}
                />
              </View>

              <View style={{flex: 1}}>
                <Text style={ss.text}>{item.user.name} started following you.</Text>
                <Text style={[ss.text, ss.text_when]}>{item.when}</Text>
              </View>
            </View>
          )}

          {item.type == 'App\\Notifications\\PostLiked' && (
            <View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    style={ss.avatar}
                    source={{uri: 'https://picsum.photos/id/64/500/500'}}
                  />
                </View>

                <View style={{flex: 1}}>
                  <Text style={ss.text}>{item.user.name} liked your post.</Text>
                  <Text style={[ss.text, ss.text_when]}>{item.when}</Text>
                </View>
              </View>

              <Image
                style={ss.postImage}
                source={{uri: 'https://picsum.photos/id/65/500/500'}}
              />
            </View>
          )}
        </View>
      </Fragment>
    );
  };

  const keyExtractor = (item: any, index: number) => index.toString();
  const ItemSeparatorComponent = () => (
    <View style={{height: 10, backgroundColor: '#ccc'}} />
  );

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            contentContainerStyle={ss.notificationsContainer}
            keyExtractor={keyExtractor}
            // ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Notifications);

const ss = StyleSheet.create({
  notificationsContainer: {
    flex: 1,
  },
  Notification: {
    margin: U,
    marginBottom: 0,

    padding: 0.5 * U,
    borderRadius: 0.5 * U,

    backgroundColor: 'white',
    elevation: 32,
  },
  avatar: {
    marginRight: 0.5 * U,

    width: 1.25 * U,
    height: 1.25 * U,
    borderRadius: 0.75 * U,
  },
  text: {    
    fontSize: 0.5 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'hsl(0,0%,12%)',
  },
  text_when: {
    fontSize: 0.375 * U,
    fontFamily: 'MPLUSRounded1c-Bold',
  },
  postImage: {
    width: 4* U, height: 4* U,
    borderRadius: u,

    alignSelf: 'flex-end',
  },
})
