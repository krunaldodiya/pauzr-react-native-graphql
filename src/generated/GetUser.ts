/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetUser {
  user: GetUser_user | null;
}

export interface GetUserVariables {
  user_id: string;
}
