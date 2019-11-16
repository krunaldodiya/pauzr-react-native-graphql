import React, {useCallback, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Video from 'react-native-video';

const VideoPost = (props: any) => {
  const {data} = props;
  const [muted, setMuted] = useState();
  const [paused] = useState();

  const {item} = data;
  const {width} = Dimensions.get('window');

  const poster = item.url
    .replace('video/upload/', 'video/upload/e_blur:100/w_300/')
    .replace('.mp4', '.jpg');

  const muteVideo = useCallback(() => {
    setMuted({muted: !muted});
  }, []);

  return (
    <TouchableOpacity onPress={muteVideo}>
      <View style={{marginBottom: 10}}>
        <Video
          source={{uri: item.url}}
          style={{
            width: width - 2,
            height: (width * 3) / 4,
          }}
          paused={paused}
          muted={muted}
          controls={false}
          poster={poster}
          posterResizeMode="cover"
        />

        {muted && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: '#000',
              padding: 5,
            }}>
            <Icon
              type="MaterialIcons"
              name="volume-off"
              style={{color: '#fff', fontSize: 16}}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default VideoPost;
