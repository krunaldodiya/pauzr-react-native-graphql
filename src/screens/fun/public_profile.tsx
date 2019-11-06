import React, {useEffect, useState, Fragment} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {FlatList, NavigationScreenProp} from 'react-navigation';
import {Icon} from 'react-native-elements';
import getAssets from '../../libs/image';
import theme from '../../libs/theme';
import {useQuery} from '@apollo/react-hooks';
import {GET_AUTH_USER} from '../../graphql/query';

interface PublicProfileProps {
  navigation: NavigationScreenProp<any, any>;
}

const PublicProfile = (props: PublicProfileProps) => {
  const [tab, setTab] = useState(0);
  const {data: authUser} = useQuery(GET_AUTH_USER);
  const postsList: any = [];

  useEffect(() => {
    // dispatch.user.getPosts({user_id: authUserId});
  }, []);

  const renderItem = (data: any) => {
    const {item} = data;
    const size = Dimensions.get('screen').width / 3 - 2;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 1,
          maxWidth: size,
        }}>
        <Image
          style={{width: size, height: size}}
          source={{uri: getAssets(item.url)}}
        />
      </View>
    );
  };

  const editProfileHandler = () => null;
  const createPostHandler = () => null;

  const keyExtractor = (item: any, index: number) => index.toString();
  const ItemSeparatorComponent = () => (
    <View style={{height: 1, backgroundColor: '#ccc'}} />
  );

  const showUserPosts = () => setTab(0);
  const showLikedPosts = () => setTab(1);

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 70, height: 70, borderRadius: 35}}
                  source={{uri: getAssets(authUser.avatar)}}
                />
              </View>
            </View>

            <View style={{flex: 3, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    marginBottom: 5,
                    color: '#000',
                    fontSize: 20,
                    fontFamily: theme.fonts.TitilliumWebSemiBold,
                    fontWeight: 'bold',
                  }}>
                  350
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: theme.fonts.TitilliumWebRegular,
                    fontWeight: '600',
                  }}>
                  Posts
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    marginBottom: 5,
                    color: '#000',
                    fontSize: 20,
                    fontFamily: theme.fonts.TitilliumWebSemiBold,
                    fontWeight: 'bold',
                  }}>
                  55K
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: theme.fonts.TitilliumWebRegular,
                    fontWeight: '600',
                  }}>
                  Followers
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    marginBottom: 5,
                    color: '#000',
                    fontSize: 20,
                    fontFamily: theme.fonts.TitilliumWebSemiBold,
                    fontWeight: 'bold',
                  }}>
                  15
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: theme.fonts.TitilliumWebRegular,
                    fontWeight: '600',
                  }}>
                  Following
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 20, marginVertical: 5}}>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontFamily: theme.fonts.TitilliumWebBold,
                marginBottom: 5,
              }}>
              {authUser.name}
            </Text>

            {authUser.bio && (
              <Text
                style={{
                  color: '#404040',
                  fontSize: 13,
                  fontFamily: theme.fonts.TitilliumWebRegular,
                }}>
                {authUser.bio}
              </Text>
            )}
          </View>

          <View style={{marginHorizontal: 20, marginVertical: 5}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    marginRight: 5,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    backgroundColor: 'white',
                    height: 32,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={editProfileHandler}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    marginLeft: 5,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    backgroundColor: 'white',
                    height: 32,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={createPostHandler}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Create Post
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              marginBottom: 1,
              borderTopColor: '#eee',
              borderTopWidth: 1,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={showUserPosts}
                  style={{
                    height: 32,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: tab === 0 ? '#555' : '#eee',
                    borderBottomWidth: 1,
                    padding: 20,
                  }}>
                  <Icon
                    name="grid-on"
                    type="SimpleLineIcons"
                    style={{color: tab === 0 ? '#555' : '#aaa', fontSize: 18}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={showLikedPosts}
                  style={{
                    height: 32,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: tab === 1 ? '#555' : '#eee',
                    borderBottomWidth: 1,
                    padding: 20,
                  }}>
                  <Icon
                    name="favorite"
                    type="SimpleLineIcons"
                    style={{color: tab === 1 ? '#555' : '#aaa', fontSize: 18}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{flex: 1}}>
            <FlatList
              numColumns={3}
              keyboardShouldPersistTaps="handled"
              data={postsList}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparatorComponent}
              // onEndReached={this.getFeeds}
              // onEndReachedThreshold={0.5}
              // ListFooterComponent={this.showLoading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(PublicProfile);
