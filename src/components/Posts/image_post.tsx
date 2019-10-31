import React, {useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import getAssets from '../../libs/image';

const ImagePost = (props: any) => {
  const {data} = props;
  const {item} = data;

  const {width} = Dimensions.get('window');
  const [height, setHeight] = useState(width);

  Image.getSize(
    getAssets(item.owner.avatar),
    (w, h) => {
      setHeight((width / h) * w);
    },
    () => null
  );

  return (
    <View style={{width, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View>
          <Image style={{width: 40, height: 40}} source={{uri: getAssets(item.owner.avatar)}} />
        </View>

        <View style={{flex: 1}}>
          <Text>{item.owner.name}</Text>
          <Text>{item.when}</Text>
        </View>
      </View>

      {item.description && (
        <View style={{padding: 10}}>
          <Text>{item.description}</Text>
        </View>
      )}

      <View>
        <Image style={{width, height}} source={{uri: getAssets(item.url)}} />
      </View>
    </View>
  );
};

export default ImagePost;
