import {useLazyQuery, useQuery} from '@apollo/react-hooks';
import React, {Fragment, Suspense, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
  View,
} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import FollowButton from '../../components/User/FollowButton';
import {GetAuthUser} from '../../generated/GetAuthUser';
import {
  SearchUsers as SearchUsersType,
  SearchUsersVariables,
} from '../../generated/SearchUsers';
import get_auth_user from '../../graphql/types/queries/get_auth_user';
import search_users from '../../graphql/types/queries/search_users';
import screens from '../../libs/screens';

const SearchCategories = (props: any) => {
  const [keywords, setKeywords] = useState('');

  const {data: authUser} = useQuery<GetAuthUser, {}>(get_auth_user);

  const [searchUsers, {data}] = useLazyQuery<
    SearchUsersType,
    SearchUsersVariables
  >(search_users, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Suspense
      fallback={
        <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />
      }>
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}>
              <Icon
                name="search"
                type="evilicon"
                color="hsl(0, 0%, 24%)"
                size={30}
                containerStyle={{marginLeft: 5}}
              />

              <TextInput
                autoFocus
                placeholder="find people"
                value={keywords}
                onChangeText={value => {
                  setKeywords(value);

                  if (keywords.length) {
                    searchUsers({variables: {keywords: value, first: 10}});
                  }
                }}
                style={{width: '100%', padding: 10}}
              />
            </View>

            <View style={{marginTop: 5}}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={data ? data?.searchUsers?.data : []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(data: any) => {
                  return (
                    <ListItem
                      onPress={() => {
                        return props.navigation.push(screens.Profile, {
                          user_id: data.item.id,
                        });
                      }}
                      key={data.id}
                      leftAvatar={{
                        source: {
                          uri: data.item.avatar,
                        },
                      }}
                      title={data.item.name}
                      subtitle={`@${data.item.username}`}
                      bottomDivider
                      rightElement={
                        <FollowButton
                          guestUser={data.item}
                          authUser={authUser?.me}
                        />
                      }
                    />
                  );
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    </Suspense>
  );
};

export default SearchCategories;
