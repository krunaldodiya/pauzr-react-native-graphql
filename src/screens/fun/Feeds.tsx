import React, {Fragment, useEffect} from 'react';
import {FlatList, SafeAreaView, StatusBar, View, Text} from 'react-native';
import ImagePost from '../../components/Posts/ImagePost';

const Feeds = (props: any) => {
  useEffect(() => {
    // dispatch.post.getFeeds(null);
  }, []);

  const feedsList: any = [{}, {}];

  const renderItem = (data: any) =>
    data && data.item
      ? <ImagePost {...{data, navigation: props.navigation}} />
      : <View>
          <Text>hello</Text>
        </View>

  const keyExtractor = (item: any, index: number) => index.toString(); // todo replace with id when it's (back-end) ready
  // const ItemSeparatorComponent = () => (
  //   <View style={{height: 10, backgroundColor: '#ccc'}} />
  // );

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, /*flexDirection: 'row', alignItems: 'stretch'*/}}>
          <FlatList
            // containerStyle={{flex: 1, backgroundColor: 'red'}} // todo resolve
            data={feedsList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            // ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Feeds);
