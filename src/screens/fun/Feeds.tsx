import {useQuery} from '@apollo/react-hooks';
import React, {Fragment} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import FeedList from '../../components/Posts/FeedList';
import {GetDrafts} from '../../generated/GetDrafts';
import get_drafts from '../../graphql/types/queries/get_drafts';

const Feeds = (props: any) => {
  const {data: feeds, loading: loadingFeeds} = useQuery<GetDrafts, {}>(
    get_drafts,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const renderItem = (data: any) => <FeedList {...props} data={data} />;

  const keyExtractor = (item: any, index: number) => index.toString();

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 90,
  };

  if (!feeds && loadingFeeds) {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            data={feeds ? feeds.drafts : []}
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
