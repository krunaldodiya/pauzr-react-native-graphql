import React, {useState} from 'react';
import {Dimensions, Image, Text, View, StyleSheet} from 'react-native';
import getAssets from '../../libs/image';

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

// todo move to global style utils
const {width} = Dimensions.get('window')
const U = width / 16
const u = width / 64

export default (props: any) => {
  const {data} = props;
  const {post} = sampleData;

  const {width} = Dimensions.get('window'); // todo padding
  const [height, setHeight] = useState(width);


  const avatarAsset = post.author.avatar // getAssets(..)

  Image.getSize(
    post.imageUrl,
    (w, h) => {
      setHeight((width / h) * w);
    },
    () => null
  );

  console.log(width)

  return (
    <View style={ss.postContainer}>
      <View style={ss.authorPlaneContainer}>
        <Image style={ss.authorAvatar} source={{uri: avatarAsset}} />
        <View style={{}}>
          <Text>{post.author.name}</Text>
          <Text>{post.timestamp}</Text>
        </View>
      </View>

      {post.description && (
        <View style={{padding: 10}}>
          <Text>{post.description}</Text>
        </View>
      )}

      <Image style={[ss.image, {width, height}]} source={{uri: post.imageUrl}} />
    </View>
  );
};

const ss = StyleSheet.create({
  postContainer: {
    borderRadius: U,
    backgroundColor: 'white',
    overflow: 'hidden',

    elevation: 32, // todo ios ; todo plugin for android for svg shadow (or what is uses now)
  },
  authorPlaneContainer: {
    flexDirection: 'row', 
    padding: 0.5 *U,
    
    borderRadius: U,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 12, 
  },
  authorAvatar: {
    width: 2 *U,
    height: 2 *U,
    borderRadius: U - u,
    overflow: 'hidden',
  },

  image: {
    borderRadius: U,
  },
})
