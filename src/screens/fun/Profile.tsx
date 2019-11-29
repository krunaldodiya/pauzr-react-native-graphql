import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, useEffect, Suspense, useState} from 'react';
import {
  ActivityIndicator,
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
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {FlatList, NavigationScreenProp} from 'react-navigation';
import FeedList from '../../components/Posts/FeedList';
import ActionButton from '../../components/User/ActionButton';

import getAssets from '../../libs/image';
import {GetAuthUser} from '../../generated/GetAuthUser';
import {GetUser} from '../../generated/GetUser';
import get_auth_user from '../../graphql/types/queries/get_auth_user';
import get_user from '../../graphql/types/queries/get_user';
import {u, U} from '../../libs/vars';
import ss from './ProfileStyle';

interface ProfileProps {
  navigation: NavigationScreenProp<any, any>;
}

const Profile = (props: ProfileProps) => {
 
  const [tab, setTab] = useState(0);

  const {data: authUser, loading: loadingAuthUser} = useQuery<GetAuthUser, {}>(
    get_auth_user,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const {data: guestUser, loading: loadingGuestUser} = useQuery<GetUser, {}>(
    get_user,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        user_id: props.navigation?.state?.params?.user_id
          ? props.navigation.state.params.user_id
          : authUser?.me?.id,
      },
    },
  );

  if (loadingAuthUser || loadingGuestUser) {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }

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

  return (
    <Suspense
      fallback={
        <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />
      }>
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

              <ActionButton
                {...props}
                style={{margin: U, marginTop: 0}}
                authUser={authUser.me}
                guestUser={guestUser.getUserById}
              />
            </View>

            <TabView
                style={{marginTop: 10}}
                swipeEnabled={true}
                navigationState={{
                  index: tab,
                  routes: [
                    {key: 'first', icon: 'grid-on'},
                    {key: 'second', icon: 'favorite'},
                  ],
                }}
                onIndexChange={index => {
                  setTab(index);
                }}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    renderIcon={props => {
                      return (
                        <Icon
                          name={props.route.icon}
                          color={props.focused ? 'red' : 'grey'}
                        />
                      );
                    }}
                    indicatorContainerStyle={{backgroundColor: 'white', borderBottomLeftRadius: U, borderBottomRightRadius: U}}
                    indicatorStyle={{backgroundColor: 'transparent'}}
                  />
                )}
                renderScene={SceneMap({
                  first: () => <GalleryContainer items={_items}/>,
                  second: () => <Text>two</Text>,
                })}
                initialLayout={{
                  width: Dimensions.get('window').width,
                }}
              />

            {/* <View
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
                    // onPress={showUserPosts}
                    onPress={()=>{}}
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
                    onPress={()=>{}}
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
            </View> */}

          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
    </Suspense>
  );
};

const GalleryContainer = ({items}) =>
  <View style={ss.galleryContainer}>
    {items.map(item => (
      <View style={ss.galleryItem}>
        <Image
          style={ss.galleryItem__image}
          source={{uri: `https://picsum.photos/id/${item}/500/500`}}
        />
      </View>
    ))}
  </View>

export default React.memo(Profile);
