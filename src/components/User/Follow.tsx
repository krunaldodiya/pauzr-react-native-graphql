import {useMutation} from '@apollo/react-hooks';
import {defaultDataIdFromObject} from 'apollo-boost';
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {USER_INFO_FRAGMENT} from '../../graphql/fragment';
import {TOGGLE_FOLLOW} from '../../graphql/mutation';

const FollowButton = (props: any) => {
  const {user, authUser} = props;

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW, {
    fetchPolicy: 'no-cache',
  });

  return (
    <View>
      {user.id != authUser.me.id && (
        <Button
          buttonStyle={{
            width: 90,
            height: 30,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: user.is_following ? 'skyblue' : 'white',
            backgroundColor: user.is_following ? 'white' : 'skyblue',
          }}
          titleStyle={{
            color: user.is_following ? 'black' : 'white',
            fontSize: 12,
            textTransform: 'uppercase',
          }}
          title={user.is_following ? 'following' : 'follow'}
          onPress={async () =>
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
                    is_following: data.toggleFollow === 'attached',
                  },
                });
              },

              optimisticResponse: {
                __typename: 'Mutation',
                toggleFollow: user.is_following ? 'detached' : 'attached',
              },
            })
          }
        />
      )}
    </View>
  );
};

export default FollowButton;
