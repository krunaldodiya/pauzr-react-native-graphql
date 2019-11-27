import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {Notifications as NotificationsType} from '../../generated/Notifications';
import notifications from '../../graphql/types/queries/notifications';
import {U, u} from '../../libs/vars';
import moment from 'moment';

const Notifications = (props: any) => {
  useEffect(() => {
    // dispatch.notification.getNotifications(null);
  }, []);

  const {data, loading}: any = useQuery<NotificationsType, {}>(notifications, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />;
  }

  const renderItem = (data: any) => {
    const {item} = data;

    const json = JSON.parse(item.data);
    console.log('json', json);

    return (
      <Fragment>
        {/* <View style={ss.Notification}> */}
        {item.type == 'App\\Notifications\\UserFollowed' && (
          <View style={ss.Notification}>
            <View>
              <Image style={ss.avatar} source={{uri: json.follower.avatar}} />
            </View>

            <View style={{flex: 1}}>
              <Text style={ss.text}>
                {json.follower.name} started following you.
              </Text>
              <Text style={[ss.text, ss.text_when]}>
                {moment('2019-11-16 17:13:34').fromNow()}
              </Text>
            </View>
          </View>
        )}

        {item.type == 'App\\Notifications\\PostLiked' && (
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
        {/* </View> */}
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
            data={data.notifications}
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
});
