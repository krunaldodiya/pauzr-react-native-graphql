/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: MessageAdded
// ====================================================

export interface MessageAdded_messageAdded_sender {
  __typename: "User";
  id: string;
  name: string;
}

export interface MessageAdded_messageAdded {
  __typename: "Chat";
  id: string;
  text: string;
  sender: MessageAdded_messageAdded_sender;
}

export interface MessageAdded {
  messageAdded: MessageAdded_messageAdded;
}
