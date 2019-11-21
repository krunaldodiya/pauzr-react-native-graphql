/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_posts_paginatorInfo {
  __typename: "PaginatorInfo";
  /**
   * Total count of available items in the page.
   */
  count: number;
  /**
   * If collection has more pages.
   */
  hasMorePages: boolean;
}

export interface GetPosts_posts_data_attachments {
  __typename: "Attachment";
  id: string;
  path: string;
  mime: string;
  source: string | null;
  thumbnail: string;
  size: string;
  height: string;
  width: string;
  status: boolean | null;
}

export interface GetPosts_posts_data_owner {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
}

export interface GetPosts_posts_data_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface GetPosts_posts_data {
  __typename: "Post";
  id: string;
  description: string | null;
  type: string;
  attachments: GetPosts_posts_data_attachments[];
  owner: GetPosts_posts_data_owner;
  category: GetPosts_posts_data_category;
  when: string;
  is_favorited: boolean;
  created_at: any;
  updated_at: any;
}

export interface GetPosts_posts {
  __typename: "PostPaginator";
  paginatorInfo: GetPosts_posts_paginatorInfo;
  data: GetPosts_posts_data[];
}

export interface GetPosts {
  posts: GetPosts_posts | null;
}

export interface GetPostsVariables {
  page: number;
  first: number;
}
