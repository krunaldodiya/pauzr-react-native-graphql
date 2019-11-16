import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import ss, {u, U} from './imagePostStyle';

export default (props: any) => {
  const post = props.data.item;
  const {width, height} = post.attachments[0];

  const imageWidth = Dimensions.get('window').width;
  const imageHeight = (width / parseInt(height)) * parseInt(width);

  const avatarAsset = post.owner.avatar
    ? post.owner.avatar
    : 'https://picsum.photos/id/492/300/300';

  const postAsset = post.attachments[0].source
    ? post.attachments[0].source
    : 'https://picsum.photos/id/1/300/300';

  return (
    <View style={ss.postContainer}>
      <View style={ss.postContentContainer}>
        <View style={ss.postContentContainer__topPlane}>
          <Image style={ss.authorAvatar} source={{uri: avatarAsset}} />
          <View style={{flex: 1}}>
            <Text style={ss.authorName}>{post.owner.name}</Text>
          </View>
        </View>

        <Image
          style={[ss.image, {width: imageWidth, height: imageHeight}]}
          source={{uri: postAsset}}
        />
      </View>

      {post.description && (
        <Text style={ss.description}>{post.description}</Text>
      )}

      <View style={ss.timestampAndCategory}>
        <Text style={ss.timestamp}> 3 days ago </Text>
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
