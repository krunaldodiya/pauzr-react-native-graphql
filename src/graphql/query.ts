import {gql} from 'apollo-boost';
import {USER_INFO_FRAGMENT, POST_INFO_FRAGMENT} from './fragment';

export const LOAD_COUNTRIES = gql`
  query LoadCountries {
    countries {
      id
      name
      phonecode
      shortname
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($keywords: String!, $first: Int!, $page: Int) {
    searchUsers(keywords: $keywords, first: $first, page: $page) {
      data {
        ...UserInfo
      }
      paginatorInfo {
        total
      }
    }
  }

  ${USER_INFO_FRAGMENT}
`;

export const GET_AUTH_USER = gql`
  query GetAuthUser {
    me {
      ...UserInfo
    }
  }

  ${USER_INFO_FRAGMENT}
`;

export const GET_INITIAL_SCREEN = gql`
  query GetInitialScreen @client {
    initialScreen
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry @client {
    country {
      id
      name
      phonecode
      shortname
    }
  }
`;

export const GET_LANGUAGES = gql`
  query LoadLanguages {
    languages {
      id
      name
      nickname
      shortname
      background_image
      background_color
    }
  }
`;

export const GET_CATEGORIES = gql`
  query LoadCategories {
    categories {
      id
      name
      background_image
      background_color
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($page: Int!, $first: Int!) {
    posts(page: $page, first: $first) {
      paginatorInfo {
        count
        hasMorePages
      }
      data {
        ...PostInfo
      }
    }
  }

  ${POST_INFO_FRAGMENT}
`;

export const GET_DRAFTS = gql`
  query GetDrafts {
    drafts {
      ...PostInfo
    }
  }

  ${POST_INFO_FRAGMENT}
`;
