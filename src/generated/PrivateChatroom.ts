/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrivateChatroom
// ====================================================

export interface PrivateChatroom_private_chatroom {
  __typename: "Chatroom";
  id: string;
  chatroom_name: string;
  chatroom_type: string;
}

export interface PrivateChatroom {
  private_chatroom: PrivateChatroom_private_chatroom;
}

export interface PrivateChatroomVariables {
  friend_id: string;
}
