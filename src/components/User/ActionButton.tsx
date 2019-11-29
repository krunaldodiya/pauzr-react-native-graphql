import React from 'react';
import {View} from 'react-native';
import CreatePostButton from './CreatePostButton';
import EditProfileButton from './EditProfileButton';
import FollowButton from './FollowButton';
import MessageButton from './MessageButton';

const ActionButton = (props: any) => {
  const {authUser, guestUser} = props;
  const type = authUser?.id == guestUser?.id ? 'auth' : 'guest';

  return (
    <View style={[{marginHorizontal: 20, marginTop: 20}, props.style]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          {type == 'auth' ? (
            <CreatePostButton {...props} />
          ) : (
            <FollowButton
              {...props}
              guestUser={guestUser}
              authUser={authUser}
            />
          )}
        </View>

        <View style={{flex: 1}}>
          {type == 'auth' ? (
            <EditProfileButton {...props} />
          ) : (
            <MessageButton {...props} />
          )}
        </View>
      </View>
    </View>
  );
};

export default ActionButton;
