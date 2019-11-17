import React from 'react';
import {Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import ss from './FeedListStyle';

const ImagePost = (props: any) => {
  const {data} = props;

  const {width} = Dimensions.get('window');

  return (
    <Image
      style={[
        ss.image,
        {
          width,
          height: (width * 3) / 4,
        },
      ]}
      source={{uri: data.path}}
    />
  );
};

export default ImagePost;
