/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostsByCategory
// ====================================================

export interface GetPostsByCategory_getPostsByCategory_data {
  __typename: "Post";
  id: string;
  description: string | null;
}

export interface GetPostsByCategory_getPostsByCategory {
  __typename: "PostPaginator";
  data: GetPostsByCategory_getPostsByCategory_data[];
}

export interface GetPostsByCategory {
  getPostsByCategory: GetPostsByCategory_getPostsByCategory | null;
}

export interface GetPostsByCategoryVariables {
  category_id: string;
  first: number;
}
