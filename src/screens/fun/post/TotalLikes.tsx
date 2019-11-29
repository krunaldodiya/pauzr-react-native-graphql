import React, {Fragment} from 'react'
import { View, Text, StyleSheet, FlatList, StatusBar, Image } from 'react-native'
import {width, U, u} from '../../../libs/vars'


const renderItem = (data: any) => {
  const {item} = data;

  return (
    <Fragment>
      <View style={ss.Person}>
        <Image
          style={ss.avatar}
          source={{uri: 'https://picsum.photos/id/64/500/500'}}
        />

        <Text style={ss.text}> {item.user.name} </Text>
        <Text style={[ss.follow, item.canFollow && ss.follow_can]}>
          { item.canFollow ? 'follow' : 'following' }
        </Text>
      </View>
    </Fragment>
  );
};

const totalLikes = [
  {
    user: {avatar: 'https://picsum.photos/id/64/500/500', name: 'Ali Alihab'},
    canFollow: true,
  },
  {
    user: {avatar: 'https://picsum.photos/id/63/500/500', name: 'Ali Baba'},
  },
  {
    user: {avatar: 'https://picsum.photos/id/62/500/500', name: 'Baba Alihab'},
  },
  {
    user: {avatar: 'https://picsum.photos/id/61/500/500', name: 'Ali Ahmad'},
    canFollow: true,
  },
  {
    user: {avatar: 'https://picsum.photos/id/60/500/500', name: 'Ali Indus'},
  },
  {
    user: {avatar: 'https://picsum.photos/id/6/500/500', name: 'Ali Malib'},
  },
]

const TotalLikes = ({}) => (
  <View style={ss.mainContainer}>
  <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />
    <FlatList
      data={totalLikes}
      renderItem={renderItem}
      contentContainerStyle={ss.personsContainer}
      keyExtractor={i => ''+Math.random()}
      // ItemSeparatorComponent={ItemSeparatorComponent}
    />
  </View>
)

const ss = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'hsl(0,0%,94%)',

    flex: 1,
    flexDirection: 'column',
  },

  personsContainer: {
    flex: 1,
  },
  Person: {
    margin: U,
    marginBottom: 0,

    padding: 0.5 * U,
    borderRadius: 0.5 * U,

    backgroundColor: 'white',
    elevation: 32,

    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 0.5 * U,

    width: 1.25 * U,
    height: 1.25 * U,
    borderRadius: 0.75 * U,
  },
  text: {
    fontSize: 0.75 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'hsl(0,0%,12%)',

    flex: 1,
  },
  text_when: {
    fontSize: 0.375 * U,
    fontFamily: 'MPLUSRounded1c-Bold',
  },
  postImage: {
    width: 3 * U,
    height: 3 * U,
    borderRadius: u,

    // alignSelf: 'flex-end',
  },
  follow: {
    margin: u,

    padding: u * 0.5,
    paddingHorizontal: u,
    borderRadius: u,
    backgroundColor: 'hsl(0,0%,88%)',

    fontSize: 0.5 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'hsl(0,0%,24%)',
  },
  follow_can: {
    backgroundColor: 'hsl(0,0%,96%)',
    elevation: 12,
  },
})

export default TotalLikes
