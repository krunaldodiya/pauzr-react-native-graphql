import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import TimerCard from '../../components/Timer/card';
import getAssets from '../../libs/image';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const Timer = (props: any) => {
  const [tab, setTab] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    // dispatch.quote.getQuotes(null);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextTab();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [tab]);

  const loading = false;
  const quotes: any = [];
  const currentQuote = quotes[tab];

  const tps = [
    {time: 10, point: 5},
    {time: 20, point: 10},
    {time: 30, point: 20},
  ];

  const stopPlaying = () => setPlaying(false);
  const startPlaying = () => setPlaying(true);
  const showPreviousTab = () => previousTab();
  const showNextTab = () => nextTab();

  const previousTab = () => {
    if (!playing) return;
    const previousTab = tab > 0 ? tab - 1 : quotes.length - 1;
    setTab(previousTab);
  };

  const nextTab = () => {
    if (!playing) return;
    const nextTab = tab < quotes.length - 1 ? tab + 1 : 0;
    setTab(nextTab);
  };

  const RenderLayout = () => (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'skyblue'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'skyblue',
            }}>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              {quotes.map((quote: any, index: number) => {
                const width = size.width / quotes.length - 4;

                return (
                  <View
                    key={index.toString()}
                    style={{
                      height: 3,
                      width,
                      backgroundColor: index == tab ? 'black' : 'grey',
                      marginHorizontal: 2,
                    }}
                  />
                );
              })}
            </View>

            <View>
              <Image
                style={{
                  width: size.width - 20,
                  height: size.height - 150,
                  borderRadius: 10,
                }}
                resizeMode="cover"
                source={{uri: getAssets(currentQuote.image)}}
              />
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignSelf: 'center',
              bottom: 20,
            }}>
            {tps.map((tp: any, index: number) => {
              const startTimer = useCallback(() => {
                props.navigation.push('StartTimer', {time: tp.time});
              }, []);

              return (
                <TimerCard
                  key={index.toString()}
                  onTimerCardTap={startTimer}
                  cardMargin={5}
                  cardWidth={size.width / 3.1}
                  minutes={tp.point}
                  points={5}
                />
              );
            })}
          </View>

          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignSelf: 'center',
              top: 0,
              left: 0,
              height: '100%',
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              onLongPress={stopPlaying}
              onPressOut={startPlaying}
              onPress={showPreviousTab}
              style={{width: '50%'}}
            />
            <TouchableOpacity
              onLongPress={stopPlaying}
              onPressOut={startPlaying}
              onPress={showNextTab}
              style={{width: '50%'}}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );

  if (loading) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />;
  }

  if (quotes.length) {
    return <RenderLayout />;
  }

  return null;
};

export default React.memo(Timer);
