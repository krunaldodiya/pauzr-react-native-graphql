import gql from 'graphql-tag';

export default gql`
  query AllChatrooms {
    all_chatrooms {
      id
      chatroom_type
      chatroom_name
      subscribers {
        id
        name
      }
    }
  }
`;
