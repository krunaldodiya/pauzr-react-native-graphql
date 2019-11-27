import React, {Fragment, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {U, u} from '../../libs/vars';

// todo extract to external component
const DateSeparator = ({date}) => (
  <View style={ss.DateSeparator}>
    <Text style={ss.DateSeparator__text}>{date}</Text>
  </View>
);

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
      post: {url: 'asd'},
    },
    {dateSeparator: 'past week'},
    {
      type: 'App\\Notifications\\PostLiked',
      user: {avatar: '', name: 'Ali Alihab'},
      when: '27 hours ago',
      post: {url: 'asd'},
    },
    {
      type: 'App\\Notifications\\PostLiked',
      user: {avatar: '', name: 'Ali Alihab'},
      when: '27 hours ago',
      post: {url: 'asd'},
    },
  ];

  const renderItem = (data: any) => {
    const {item} = data;

    const json = JSON.parse(item.data);

    return (
      <Fragment>
        {item.type === 'App\\Notifications\\UserFollowed' && (
          <View style={ss.Notification}>
            <View>
              <Image
                style={ss.avatar}
                source={{uri: 'https://picsum.photos/id/64/500/500'}}
              />
            </View>

            <View style={{flex: 1}}>
              <Text style={ss.text}>
                {item.user.name} started following you.
              </Text>
              <Text style={[ss.text, ss.text_when]}>{item.when}</Text>
            </View>
          </View>
        )}

        {item.type === 'App\\Notifications\\PostLiked' && (
          <View style={ss.Notification}>
            <View style={{flex: 1, flexDirection: 'row'}}>
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

        {item.dateSeparator && <DateSeparator date={item.dateSeparator} />}
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

    flexDirection: 'row',
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
    width: 3 * U,
    height: 3 * U,
    borderRadius: u,

    // alignSelf: 'flex-end',
  },

  DateSeparator: {
    height: 0.5,
    // backgroundColor: 'hsl(0,0%,80%)',
    alignSelf: 'stretch',
    borderRadius: 2,

    // marginVertical: U,
    margin: U,

    // modifier: _ForNotifications
    marginTop: 1.5 * U,
    marginBottom: 0.25 * U,
  },
  DateSeparator__text: {
    // backgroundColor: 'hsl(0,0%,94%)',
    alignSelf: 'center',
    paddingHorizontal: U,

    marginTop: -1 * 0.25 * U - u * 0.675,

    color: 'hsl(0,0%,24%)',
    fontFamily: 'MPLUSRounded1c-Regular',
    fontSize: 0.5 * U,

    // modifier: _ForNotifications
    // backgroundColor: 'hsl(0,0%,98%)',
    position: 'absolute',
    zIndex: -4,
  },
});
