import React, { useState } from 'react'
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements';
import getAssets from '../../libs/image'
import ss, { u, U } from './imagePostStyle'

// temp as base64:
import {
  randomAvatar1, 
  randomAvatar2,
  randomAvatar3, 
  randomAvatar4,

  randomImage1,
  randomImage2,
  randomImage3
} from './_temp64'

const sampleData = {
  post: {
    author: {
      name: 'Kabardio Fluerence',
      avatar: randomAvatar1
    },
    imageUrl: randomImage1,
    likes: 327,
    description: 'Hello! It\'s me, trying to run my dog across the field! Cheers! :)',
    timestamp: '3 hours ago',
    comments: [
      {
        comment: 'Awesome!',
        timestamp: '33 min ago',
        author: {
          name: 'Tera Mikello',
          avatar: randomAvatar2
        },
        likes: 0
      },
      {
        comment: 'Thank you!',
        timestamp: '15 min ago',
        author: {
          name: 'Kabardio Fluerence',
          avatar: randomAvatar1
        },
        likes: 1
      },
      {
        comment: 'What is the name of that dog?',
        timestamp: '27 min ago',
        author: {
          name: 'Alisa Al Abika',
          avatar: randomAvatar3
        },
        likes: 23
      },
    ],
  }
}


export default (props: any) => {

  const { post } = sampleData

  const width = Dimensions.get('window').width - U * 2
  const [ height, setHeight ] = useState(width)

  const avatarAsset = post.author.avatar // getAssets(..)

  // refactor
  Image.getSize(
    post.imageUrl,
    (w, h) => setHeight((width / h) * w),
    () => null
  )

  return (
    <View style={ss.postContainer}>

      <View style={ss.postContentContainer}>
        <Image style={[ss.image, {width, height}]} source={{uri: post.imageUrl}} />

        <View style={ss.postContentContainer__bottomPlane}>
          <Image style={ss.authorAvatar} source={{uri: avatarAsset}} />
          <View style={{flex: 1}}>
            <Text style={ss.authorName}>{post.author.name}</Text>

            {/* unfollowedAuthor -- it's just for example. Dont know how is better to know can we follow it or not */}
            {/* to play around with displaying -- toggl this '!' */}
            {!!post.unfollowedAuthor && <FollowLabel style={{marginLeft: 1.22 * U}} />}
          </View>
          <Icon name="favorite" type="SimpleLineIcons" 
                color='hsl(341, 97%, 67%)' size={2 * 0.64 * U}
                containerStyle={ss.button} />
        </View>
      </View>

      {post.description && <Text style={ss.description}> {post.description}</Text>}

      <View style={ss.bottomContainer}>
        <View style={{flex: 1 /*5*/}}>
          {/* {post.description && <Text style={ss.description}> {post.description}</Text>} */}
          <Text style={ss.timestamp}> {post.timestamp} </Text>
        </View>
        <Icon name='comment' type="evilicon" 
              color='hsl(0, 0%, 24%)' size={2 * 0.64 * U}
              containerStyle={[ss.button, ss.button_bottom]} />
        <Icon name="sc-telegram" type="evilicon" 
              color='hsl(0, 0%, 24%)' size={2 * 0.64 * U}
              containerStyle={[ss.button, ss.button_bottom]} />
        <Icon name="kebab-vertical" type="octicon" 
              color='hsl(0, 0%, 24%)' size={1 * 0.64 * U}
              containerStyle={[ss.button, ss.button_bottom, {paddingVertical: 0.64 * u}]} />
      </View>

    </View>
  )
}

export const FollowLabel = ({userIdOrSomethingForApi, style}) =>
  <Text style={[ss.FollowLabel, style]} onPress={()=>{}}> + follow </Text>
