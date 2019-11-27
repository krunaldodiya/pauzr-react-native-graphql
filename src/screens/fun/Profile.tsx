import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList, NavigationScreenProp} from 'react-navigation';
import FeedList from '../../components/Posts/FeedList';
import {GetAuthUser} from '../../generated/GetAuthUser';
import get_auth_user from '../../graphql/types/queries/get_auth_user';
import getAssets from '../../libs/image';
import {u, U} from '../../libs/vars';
import ss from './ProfileStyle';

interface ProfileProps {
  navigation: NavigationScreenProp<any, any>;
}

const Profile = (props: ProfileProps) => {
  const [tab, setTab] = useState(0);
  const {data: authUser} = useQuery<GetAuthUser, {}>(get_auth_user);
  const postsList: any = [];

  useEffect(() => {
    // dispatch.user.getPosts({user_id: authUserId});
  }, []);

  // todo rm
  const _obsolete_renderItem = (data: any) => {
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

  const _items = [
    30,
    14,
    52,
    32,
    12,
    51,
    33,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
  ];

  const renderItem = (data: any) => <FeedList data={data} />;

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
          <View style={ss.mainContainer}>
            <View style={ss.aboutContainer}>
              <View style={ss.aboutContainer__avaAndMeta}>
                <Image
                  style={ss.avatar}
                  // source={{uri: getAssets(authUser.avatar)}}
                  source={{uri: 'https://picsum.photos/id/54/500/500'}}
                />

                <View style={ss.metaBlock}>
                  <Text style={ss.metaBlock__text_number}> 350 </Text>
                  <Text style={ss.metaBlock__text}> posts </Text>
                </View>

                <View style={ss.metaBlock}>
                  <Text style={ss.metaBlock__text_number}> 55K </Text>
                  <Text style={ss.metaBlock__text}> followers </Text>
                </View>

                <View style={ss.metaBlock}>
                  <Text style={ss.metaBlock__text_number}> 15 </Text>
                  <Text style={ss.metaBlock__text}> following </Text>
                </View>

                <Icon
                  name="kebab-vertical"
                  type="octicon"
                  color="hsl(0, 0%, 24%)"
                  size={1 * 0.64 * U}
                  containerStyle={{flex: 0.5, paddingLeft: u}}
                />
              </View>

              <View style={ss.aboutContainer__nameAndBio}>
                <Text style={ss.name}>
                  {/* {authUser.name} */}
                  Mister Kleviy
                </Text>
                {/* \/ watch out debug toggle '!' */}
                {!authUser.bio && (
                  <Text style={ss.bio}>
                    {/* {authUser.bio} */}
                    {/* there's absolute random bio lol */}
                    Brittany Wright I see food as an art and an opportunity to
                    do something creative. | San Diego, CA ⚡ PRINT SHOP:
                    wrightkitchen.com
                  </Text>
                )}
              </View>
            </View>

            {/* <View style={{marginHorizontal: 20, marginVertical: 5}}>
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
            </View> */}

            <View
              style={{
                margin: U,
                marginBottom: -U + 1,
                borderColor: '#eee',
                borderWidth: 1,
                borderTopLeftRadius: U,
                borderTopRightRadius: U,
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

            {/*
            <View style={{flex: 1}}>
              <FlatList
                // numColumns={3}
                keyboardShouldPersistTaps="handled"
                // data={postsList}
                data={[
                  {
                    owner: {
                      avatar: 'https://picsum.photos/id/54/500/500',
                      name: 'Ardual Kebab',
                    },
                    category: {name: 'Food'},
                    attachments: [
                      {
                        path: 'https://picsum.photos/id/54/500/500',
                        mime: 'video/mp4',
                      },
                    ],
                    description: '*-* Cool mountains this weekend :)',
                  },
                  {
                    owner: {
                      avatar: 'https://picsum.photos/id/54/500/500',
                      name: 'Ardual Kebab',
                    },
                    category: {name: 'Food'},
                    attachments: [
                      {
                        path: 'https://picsum.photos/id/54/500/500',
                        mime: 'video/mp4',
                      },
                    ],
                  },
                ]}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                // ItemSeparatorComponent={ItemSeparatorComponent}
                // onEndReached={this.getFeeds}
                // onEndReachedThreshold={0.5}
                // ListFooterComponent={this.showLoading}
              />
            </View>*/}

            <View style={ss.galleryContainer}>
              {_items.map(item => (
                <View style={ss.galleryItem}>
                  <Image
                    style={ss.galleryItem__image}
                    source={{uri: `https://picsum.photos/id/${item}/500/500`}}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Profile);
