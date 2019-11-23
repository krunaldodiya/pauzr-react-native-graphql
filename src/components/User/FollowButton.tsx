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
  const {guestUser, authUser} = props;

  console.log(guestUser);

  const [toggleFollow] = useMutation<ToggleFollow, ToggleFollowVariables>(
    toggle_follow,
  );

  return (
    <View>
      {guestUser.id != authUser.id && (
        <Button
          buttonStyle={{
            width: 110,
            height: 30,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: guestUser.is_following ? '#50b8e7' : 'white',
            backgroundColor: guestUser.is_following ? 'white' : '#50b8e7',
          }}
          titleStyle={{
            color: guestUser.is_following ? 'black' : 'white',
            fontSize: 12,
            textTransform: 'uppercase',
          }}
          title={
            guestUser.is_following
              ? 'following'
              : guestUser.is_follower
              ? 'follow back'
              : 'follow'
          }
          onPress={async () => {
            await toggleFollow({
              variables: {
                following_id: guestUser.id,
              },

              update: (store, {data}) => {
                const cacheId: any = defaultDataIdFromObject({
                  id: guestUser.id,
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
                toggleFollow: guestUser.is_following ? 'detached' : 'attached',
              },
            });
          }}
        />
      )}
    </View>
  );
};

export default FollowButton;
