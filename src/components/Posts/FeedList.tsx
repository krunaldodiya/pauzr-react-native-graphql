import {useMutation} from '@apollo/react-hooks';
import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Pages} from 'react-native-pages';
import {TOGGLE_FAVORITE} from '../../graphql/mutation';
import {u, U} from '../../libs/vars';
import ss from './FeedListStyle';
import VideoPost from './VideoPost';
import {defaultDataIdFromObject} from 'apollo-boost';
import {POST_INFO_FRAGMENT} from '../../graphql/fragment';
const {width} = Dimensions.get('window');

// todo rename also, this is one post, not list
const FeedList = (props: any) => {
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);

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
                key={attachment.id}
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
            color={post.is_favorited ? 'hsl(341, 97%, 67%)' : '#ccc'}
            size={2 * 0.64 * U}
            containerStyle={ss.button}
            onPress={async () => {
              await toggleFavorite({
                variables: {
                  post_id: post.id,
                },

                update: (store, {data}) => {
                  const cacheId: any = defaultDataIdFromObject({
                    id: post.id,
                    __typename: 'Post',
                  });

                  const postInfo = store.readFragment({
                    id: cacheId,
                    fragment: POST_INFO_FRAGMENT,
                  });

                  store.writeFragment({
                    id: cacheId,
                    fragment: POST_INFO_FRAGMENT,
                    data: {
                      ...postInfo,
                      is_favorited: data.toggleFavorite === 'attached',
                    },
                  });
                },

                optimisticResponse: {
                  __typename: 'Mutation',
                  toggleFavorite: post.is_favorited ? 'detached' : 'attached',
                },
              });
            }}
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
