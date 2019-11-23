/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrivateChatroom
// ====================================================

export interface PrivateChatroom_private_chatroom_subscribers {
  __typename: "User";
  id: string;
}

export interface PrivateChatroom_private_chatroom_chats_paginatorInfo {
  __typename: "PaginatorInfo";
  /**
   * Total items available in the collection.
   */
  total: number;
}

export interface PrivateChatroom_private_chatroom_chats_data_sender {
  __typename: "User";
  id: string;
  name: string;
}

export interface PrivateChatroom_private_chatroom_chats_data {
  __typename: "Chat";
  id: string;
  text: string;
  sender: PrivateChatroom_private_chatroom_chats_data_sender;
}

export interface PrivateChatroom_private_chatroom_chats {
  __typename: "ChatPaginator";
  paginatorInfo: PrivateChatroom_private_chatroom_chats_paginatorInfo;
  data: PrivateChatroom_private_chatroom_chats_data[];
}

export interface PrivateChatroom_private_chatroom {
  __typename: "Chatroom";
  id: string;
  chatroom_name: string;
  chatroom_type: string;
  subscribers: PrivateChatroom_private_chatroom_subscribers[];
  chats: PrivateChatroom_private_chatroom_chats | null;
}

export interface PrivateChatroom {
  private_chatroom: PrivateChatroom_private_chatroom;
}

export interface PrivateChatroomVariables {
  friend_id: string;
  per_page: number;
}
