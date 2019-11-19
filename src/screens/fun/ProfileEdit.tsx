import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList, NavigationScreenProp} from 'react-navigation';
import FeedList from '../../components/Posts/FeedList';
import {GET_AUTH_USER} from '../../graphql/query';
import getAssets from '../../libs/image';
import {u, U} from '../../libs/vars';
import ss from './ProfileEditStyle';

interface ProfileEditProps {
  navigation: NavigationScreenProp<any, any>;
}

const ProfileEdit = (props: ProfileEditProps) => {
  const [tab, setTab] = useState(0);
  const {data: authUser} = useQuery(GET_AUTH_USER);

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={ss.mainContainer}>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(ProfileEdit);
