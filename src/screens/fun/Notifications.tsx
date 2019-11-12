import React, {useEffect, Fragment} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import getAssets from '../../libs/image';

const Notifications = (props: any) => {
  useEffect(() => {
    // dispatch.notification.getNotifications(null);
  }, []);

  const notifications: any = [];

  const renderItem = (data: any) => {
    const {item} = data;

    return (
      <Fragment>
        <View style={{padding: 10}}>
          {item.type == 'App\\Notifications\\UserFollowed' && (
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={{width: 30, height: 30}}
                  source={{uri: getAssets(item.user.avatar)}}
                />
              </View>

              <View style={{flex: 1}}>
                <Text>{item.user.name} started following you.</Text>
                <Text>{item.when}</Text>
              </View>
            </View>
          )}

          {item.type == 'App\\Notifications\\PostLiked' && (
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={{width: 30, height: 30}}
                  source={{uri: getAssets(item.user.avatar)}}
                />
              </View>

              <View style={{flex: 1}}>
                <Text>{item.user.name} liked your post.</Text>
                <Text>{item.when}</Text>
              </View>

              <View>
                <Image
                  style={{width: 30, height: 30}}
                  source={{uri: getAssets(item.post.url)}}
                />
              </View>
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
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Notifications);
