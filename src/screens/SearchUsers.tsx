import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {SearchUsers, SearchUsersVariables} from '../generated/SearchUsers';
import search_users from '../graphql/types/queries/search_users';

const SearchUsers = () => {
  const [keywords, setKeywords] = useState('');
  const {data, loading, fetchMore} = useQuery<
    SearchUsers,
    SearchUsersVariables
  >(search_users, {
    variables: {
      first: 10,
      page: 1,
      keywords,
    },
  });

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
    if (!loading && !data?.users?.paginatorInfo?.hasMorePages) {
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
        <View style={{flex: 1}}>
          <FlatList
            data={data ? data.users.data : []}
            renderItem={RenderItem}
            keyExtractor={(item: any, index) => index.toString()}
            onEndReachedThreshold={1}
            onEndReached={() => {
              if (!data.users.paginatorInfo.hasMorePages) return;

              fetchMore({
                query: search_users,
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

export default React.memo(SearchUsers);
