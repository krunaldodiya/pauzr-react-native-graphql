import {useQuery} from '@apollo/react-hooks';
import React, {Fragment} from 'react';
import {FlatList, SafeAreaView, StatusBar, View} from 'react-native';
import ImagePost from '../../components/Posts/ImagePost';
import {GET_DRAFTS} from '../../graphql/query';

const Feeds = (props: any) => {
  const {data} = useQuery(GET_DRAFTS, {
    fetchPolicy: 'cache-and-network',
  });

  const renderItem = (data: any) => {
    return <ImagePost {...props} data={data} />;
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            data={data.drafts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Feeds);
