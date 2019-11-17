import React, {useCallback, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Video from 'react-native-video';

const VideoPost = (props: any) => {
  const {data} = props;
  const [muted, setMuted] = useState();

  const {width} = Dimensions.get('window');

  return (
    <TouchableOpacity onPress={() => setMuted(!muted)}>
      <View style={{marginBottom: 10}}>
        <Video
          source={{uri: data.path}}
          style={{
            width,
            height: (width * 3) / 4,
          }}
          paused={false}
          muted={muted}
          controls={false}
          poster={data.thumbnail}
          posterResizeMode="cover"
          resizeMode="cover"
          repeat
        />

        {muted && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 5,
            }}>
            <Icon
              type="MaterialIcons"
              name="volume-off"
              color="#fff"
              size={16}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default VideoPost;
