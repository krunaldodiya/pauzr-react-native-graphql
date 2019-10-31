import React, {Fragment, useEffect} from 'react';
import {FlatList, SafeAreaView, StatusBar, View, Text} from 'react-native';
import ImagePost from '../../components/Posts/image_post';

const Feeds = (props: any) => {
  useEffect(() => {
    // dispatch.post.getFeeds(null);
  }, []);

  const feedsList: any = [];

  const renderItem = (data: any) => {
    const {item} = data;

    return (
      <Fragment>
        {item ? (
          <ImagePost data={data} />
        ) : (
          <View>
            <Text>hello</Text>
          </View>
        )}
      </Fragment>
    );
  };

  const keyExtractor = (item: any, index: number) => index.toString();
  const ItemSeparatorComponent = () => (
    <View style={{height: 10, backgroundColor: '#ccc'}} />
  );

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            data={feedsList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Feeds);
