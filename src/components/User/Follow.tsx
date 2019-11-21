import {useMutation} from '@apollo/react-hooks';
import {defaultDataIdFromObject} from 'apollo-boost';
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {
  ToggleFollow,
  ToggleFollowVariables,
} from '../../generated/ToggleFollow';
import USER_INFO_FRAGMENT from '../../graphql/types/fragments/user_info';
import toggle_follow from '../../graphql/types/mutations/toggle_follow';

const FollowButton = (props: any) => {
  const {user, authUser} = props;

  const [toggleFollow] = useMutation<ToggleFollow, ToggleFollowVariables>(
    toggle_follow,
  );

  return (
    <View>
      {user.id != authUser.me.id && (
        <Button
          buttonStyle={{
            width: 110,
            height: 30,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: user.is_following ? '#50b8e7' : 'white',
            backgroundColor: user.is_following ? 'white' : '#50b8e7',
          }}
          titleStyle={{
            color: user.is_following ? 'black' : 'white',
            fontSize: 12,
            textTransform: 'uppercase',
          }}
          title={
            user.is_following
              ? 'following'
              : user.is_follower
              ? 'follow back'
              : 'follow'
          }
          onPress={async () => {
            await toggleFollow({
              variables: {
                following_id: user.id,
              },

              update: (store, {data}) => {
                const cacheId: any = defaultDataIdFromObject({
                  id: user.id,
                  __typename: 'User',
                });

                const userinfo = store.readFragment({
                  id: cacheId,
                  fragment: USER_INFO_FRAGMENT,
                });

                store.writeFragment({
                  id: cacheId,
                  fragment: USER_INFO_FRAGMENT,
                  data: {
                    ...userinfo,
                    is_following: data && data.toggleFollow === 'attached',
                  },
                });
              },

              optimisticResponse: {
                toggleFollow: user.is_following ? 'detached' : 'attached',
              },
            });
          }}
        />
      )}
    </View>
  );
};

export default FollowButton;
