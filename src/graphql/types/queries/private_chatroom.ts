import gql from 'graphql-tag';

export default gql`
  query PrivateChatroom($friend_id: ID!, $per_page: Int!) {
    private_chatroom(friend_id: $friend_id) {
      id
      chatroom_name
      chatroom_type
      subscribers {
        id
        name
        avatar
      }
      chats(first: $per_page) {
        paginatorInfo {
          total
        }
        data {
          id
          text
          sender {
            id
            name
            avatar
          }
        }
      }
    }
  }
`;
