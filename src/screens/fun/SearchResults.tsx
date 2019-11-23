import {useLazyQuery, useQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {FlatList, TextInput, View} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import FollowButton from '../../components/User/FollowButton';
import {GetAuthUser} from '../../generated/GetAuthUser';
import {SearchUsers, SearchUsersVariables} from '../../generated/SearchUsers';
import get_auth_user from '../../graphql/types/queries/get_auth_user';
import search_users from '../../graphql/types/queries/search_users';
import screens from '../../libs/screens';

const SearchResults = (props: any) => {
  const [keywords, setKeywords] = useState('');

  const {data: authUser} = useQuery<GetAuthUser, {}>(get_auth_user);

  const [searchUsers, {data}] = useLazyQuery<SearchUsers, SearchUsersVariables>(
    search_users,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  return (
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
                  <FollowButton guestUser={data.item} authUser={authUser?.me} />
                }
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default SearchResults;
