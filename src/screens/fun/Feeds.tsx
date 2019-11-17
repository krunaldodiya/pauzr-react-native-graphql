import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import FeedList from '../../components/Posts/FeedList';
import {GET_DRAFTS} from '../../graphql/query';

const Feeds = (props: any) => {
  const [viewableItem, setViewableItem] = useState();
  const {data: feeds, loading: loadingFeeds} = useQuery(GET_DRAFTS, {
    fetchPolicy: 'cache-and-network',
  });

  const renderItem = (data: any) => {
    return <FeedList {...props} data={data} />;
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 90,
  };

  if (loadingFeeds) {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            data={feeds.drafts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            viewabilityConfig={viewabilityConfig}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Feeds);
