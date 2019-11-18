import {useLazyQuery, useQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import FollowButton from '../../components/User/Follow';
import {GET_AUTH_USER, SEARCH_USERS} from '../../graphql/query';

const SearchResults = (props: any) => {
  const [keywords, setKeywords] = useState('');

  const {data: authUser} = useQuery(GET_AUTH_USER);

  const [searchUsers, {data}] = useLazyQuery(SEARCH_USERS, {
    fetchPolicy: 'cache-and-network',
  });

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
          data={data ? data.searchUsers.data : []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data: any) => {
            return (
              <View
                style={{
                  marginVertical: 2,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#50b8e7',
                  borderRadius: 10,
                }}>
                <View style={{marginHorizontal: 5}}>
                  <Image
                    source={{uri: data.item.avatar}}
                    style={{width: 40, height: 40}}
                  />
                </View>

                <View
                  style={{flex: 1, padding: 5, justifyContent: 'space-evenly'}}>
                  <Text style={{fontSize: 16, textTransform: 'none'}}>
                    {data.item.name}
                  </Text>
                  <Text style={{fontSize: 12, color: '#50b8e7'}}>
                    @{data.item.username}
                  </Text>
                </View>

                <View style={{marginRight: 10}}>
                  <FollowButton user={data.item} authUser={authUser} />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SearchResults;
