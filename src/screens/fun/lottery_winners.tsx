import React, {useEffect, Fragment} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import getAssets from '../../libs/image';

const LotteryWinners = (props: any) => {
  useEffect(() => {
    // dispatch.lottery.getLotteryWinners(null);
  }, []);

  const lottery: any = [];

  const winnersList = Object.keys(lottery.winners)
    .map(key => lottery.winners[key])
    .sort((a: any, b: any) => b.id - a.id);

  const renderItem = (data: any) => {
    const {item} = data;

    return (
      <Fragment>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View>
            <Image
              style={{width: 30, height: 30}}
              source={{uri: getAssets(item.user.avatar)}}
            />
          </View>

          <View style={{flex: 1}}>
            <Text>{item.user.name}</Text>
            <Text>Won {item.amount}</Text>
          </View>

          <View>
            <Text>{item.date}</Text>
            <Text>{item.time}</Text>
          </View>
        </View>
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
            data={winnersList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(LotteryWinners);
