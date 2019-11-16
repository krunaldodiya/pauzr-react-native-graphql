import React from 'react';
import {Image, Text, View, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {Pages} from 'react-native-pages';
import Video from 'react-native-video';
import {u, U} from '../../libs/vars';
import ss from './FeedListStyle';
const {width} = Dimensions.get('window');

const FeedList = (props: any) => {
  const post = props.data.item;

  return (
    <View style={ss.postContainer}>
      <View style={ss.postContentContainer}>
        <View style={ss.postContentContainer__topPlane}>
          <Image style={ss.authorAvatar} source={{uri: post.owner.avatar}} />
          <View style={{flex: 1}}>
            <Text style={ss.authorName}>{post.owner.name}</Text>
          </View>
        </View>

        <Pages
          style={{height: 360}}
          indicatorColor={post.attachments.length > 1 ? 'red' : 'transparent'}
          indicatorOpacity={0.5}>
          {post.attachments.map((attachment: any) => {
            const isVideo = attachment.mime.includes('video');

            // const {width, height} = attachment;

            // const imageWidth = Dimensions.get('window').width;
            // const imageHeight = (width / parseInt(height)) * parseInt(width);

            if (isVideo) {
              return (
                <Video
                  key={attachment.id}
                  source={{uri: attachment.path}}
                  style={{
                    width: 360,
                    height: 360,
                  }}
                  paused={false}
                  muted={false}
                  poster={attachment.thumbnail}
                  posterResizeMode="cover"
                  resizeMode="cover"
                />
              );
            }

            return (
              <Image
                style={[ss.image, {width: 360, height: 360}]}
                source={{uri: attachment.path}}
                key={attachment.id}
              />
            );
          })}
        </Pages>
      </View>

      {post.description && (
        <Text style={ss.description}>{post.description}</Text>
      )}

      <View style={ss.timestampAndCategory}>
        <Text style={ss.timestamp}>{post.when}</Text>
        <Text style={ss.category}>Category: {post.category.name}</Text>
      </View>

      <View style={ss.bottomContainer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="favorite"
            type="SimpleLineIcons"
            color="hsl(341, 97%, 67%)"
            size={2 * 0.64 * U}
            containerStyle={ss.button}
          />
          <Text
            style={ss.totalLikes}
            onPress={() =>
              props.navigation.push('TotalLikes', {postId: post.id})
            }>
            {post.likes}
          </Text>
        </View>
        <Icon
          name="comment"
          type="evilicon"
          color="hsl(0, 0%, 24%)"
          size={2 * 0.64 * U}
          containerStyle={[ss.button, ss.button_bottom]}
        />
        <Icon
          name="sc-telegram"
          type="evilicon"
          color="hsl(0, 0%, 24%)"
          size={2 * 0.64 * U}
          containerStyle={[ss.button, ss.button_bottom]}
        />
        <Icon
          name="kebab-vertical"
          type="octicon"
          color="hsl(0, 0%, 24%)"
          size={1 * 0.64 * U}
          containerStyle={[
            ss.button,
            ss.button_bottom,
            {paddingVertical: 0.64 * u},
          ]}
        />
      </View>
    </View>
  );
};

export default FeedList;
