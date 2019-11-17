import React from 'react';
import {Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import ss from './FeedListStyle';

const ImagePost = (props: any) => {
  const {data} = props;

  return (
    <Image
      style={[
        ss.image,
        {
          width: '100%',
          height: '100%',
        },
      ]}
      source={{uri: data.path}}
    />
  );
};

export default ImagePost;
