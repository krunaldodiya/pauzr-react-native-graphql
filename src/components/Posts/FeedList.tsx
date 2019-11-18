import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Pages} from 'react-native-pages';
import {u, U} from '../../libs/vars';
import ss from './FeedListStyle';
import VideoPost from './VideoPost';
const {width} = Dimensions.get('window');

// todo rename also, this is one post, not list
const FeedList = (props: any) => {
  const post = props.data.item;

  return (
    <View style={ss.postContainer}>
      <View style={ss.postContentContainer}>
        <View style={ss.postContentContainer__topPlane}>
          <Image style={ss.authorAvatar} source={{uri: post.owner.avatar}} />
          <View style={{flex: 1}}>
            <Text style={ss.authorName}>{post.owner.name}</Text>
            <Text style={ss.category}>posted in {post.category.name}</Text>
          </View>
        </View>

        <Pages
          style={{width: width, height: width}}
          indicatorColor={post.attachments.length > 1 ? 'red' : 'transparent'}
          indicatorOpacity={0.5}>
          {post.attachments.map((attachment: any) => {
            const isVideo = attachment.mime.includes('video');

            if (isVideo) {
              return (
                <VideoPost key={attachment.id} {...props} data={attachment} />
              );
            }

            return (
              <Image
                style={[ss.image, {width: 14 * U, height: 14 * U}]}
                source={{uri: attachment.path}}
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
        {/* <Text style={ss.category}>Category: {post.category.name}</Text> */}
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
