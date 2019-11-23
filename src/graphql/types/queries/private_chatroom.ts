import gql from 'graphql-tag';

export default gql`
  query PrivateChatroom($friend_id: ID!) {
    private_chatroom(friend_id: $friend_id) {
      id
      chatroom_type
      chatroom_name
      chatroom_image
      subscribers {
        id
        name
        avatar
      }
    }
  }
`;
