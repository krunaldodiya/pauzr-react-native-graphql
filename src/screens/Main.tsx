import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {Fragment} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SET_AUTH_USER} from '../graphql/mutation';
import {GET_AUTH_USER, GET_USERS} from '../graphql/query';

const Main = () => {
  const {data, loading, fetchMore} = useQuery(GET_USERS, {
    variables: {
      first: 10,
      page: 1,
    },
  });

  const {data: authUser} = useQuery(GET_AUTH_USER);
  const [setAuthUSer] = useMutation(SET_AUTH_USER);

  if (!data) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center', padding: 10}}
      />
    );
  }

  const RenderItem = (data: any) => {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          margin: 10,
          height: 100,
          backgroundColor: 'green',
        }}>
        <Text style={{color: 'white'}}>{data.item.name}</Text>
      </View>
    );
  };

  const ShowListFooterComponent = () => {
    if (!loading && !data.users.paginatorInfo.hasMorePages) {
      return (
        <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
          <Text style={{textAlign: 'center'}}>No More Results</Text>
        </View>
      );
    }

    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center', padding: 10}}
      />
    );
  };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => {
            setAuthUSer({
              variables: {
                ...authUser.auth,
                authToken: 'abcd',
                initialScreen: 'Home',
              },
            });
          }}>
          <Text>{authUser.auth.initialScreen}</Text>
        </TouchableOpacity>

        <View style={{flex: 1}}>
          <FlatList
            data={data ? data.users.data : []}
            renderItem={RenderItem}
            keyExtractor={(item: any, index) => index.toString()}
            onEndReachedThreshold={1}
            onEndReached={() => {
              if (!data.users.paginatorInfo.hasMorePages) return;

              fetchMore({
                query: GET_USERS,
                variables: {
                  first: data.users.paginatorInfo.perPage,
                  page: data.users.paginatorInfo.currentPage + 1,
                },
                updateQuery: (prev, {fetchMoreResult}) => {
                  return {
                    users: {
                      data: [...prev.users.data, ...fetchMoreResult.users.data],
                      paginatorInfo: fetchMoreResult.users.paginatorInfo,
                      __typename: 'UserPaginator',
                    },
                  };
                },
              });
            }}
            ListFooterComponent={ShowListFooterComponent}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Main);
