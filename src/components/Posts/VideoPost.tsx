import React, {useCallback, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Video from 'react-native-video';

const VideoPost = (props: any) => {
  const {data} = props;
  const [paused, setPaused] = useState(true);

  return (
    <TouchableOpacity onPress={() => setPaused(!paused)}>
      <View style={{marginBottom: 10}}>
        <Video
          source={{uri: data.path}}
          style={{
            width: '100%',
            height: '100%',
          }}
          paused={paused}
          muted={false}
          controls={false}
          poster={data.thumbnail}
          posterResizeMode="cover"
          resizeMode="cover"
          repeat
        />

        {paused && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              type="MaterialIcons"
              name="play-arrow"
              color="#fff"
              size={64}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default VideoPost;
