import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, Suspense, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {NavigationScreenProp} from 'react-navigation';
import ActionButton from '../../components/User/ActionButton';
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

  const {data: authUser} = useQuery<GetAuthUser, {}>(get_auth_user, {
    fetchPolicy: 'cache-and-network',
  });

  const {data: guestUser} = useQuery<GetUser, {}>(get_user, {
    fetchPolicy: 'cache-and-network',
    variables: {
      user_id: props.navigation.state.params.user_id
        ? props.navigation.state.params.user_id
        : authUser?.me?.id,
    },
  });

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
                    source={{uri: guestUser?.user?.avatar}}
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
                  <Text style={ss.name}>{guestUser?.user?.name}</Text>
                  {/* \/ watch out debug toggle '!' */}
                  {!authUser.bio && (
                    <Text style={ss.bio}>{guestUser?.user?.bio}</Text>
                  )}
                </View>
              </View>

              <ActionButton
                {...props}
                authUser={authUser.me}
                guestUser={guestUser.getUserById}
              />

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
                    indicatorContainerStyle={{backgroundColor: 'white'}}
                    indicatorStyle={{backgroundColor: '#a3a3a3'}}
                  />
                )}
                renderScene={SceneMap({
                  first: () => <Text>one</Text>,
                  second: () => <Text>two</Text>,
                })}
                initialLayout={{
                  width: Dimensions.get('window').width,
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    </Suspense>
  );
};

export default React.memo(Profile);
