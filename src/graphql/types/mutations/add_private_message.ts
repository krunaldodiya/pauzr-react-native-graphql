import gql from 'graphql-tag';

export default gql`
  mutation addPrivateMessage($text: String!, $chatroom_id: ID!) {
    addPrivateMessage(text: $text, chatroom_id: $chatroom_id) {
      id
      text
      sender {
        id
        name
      }
    }
  }
`;
