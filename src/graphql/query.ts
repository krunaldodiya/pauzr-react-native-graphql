import {gql} from 'apollo-boost';

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

export const GET_USERS = gql`
  query GetUsers($first: Int!, $page: Int!) {
    users(first: $first, page: $page) {
      id
      name
      email
      mobile
      language
      country {
        id
        name
        phonecode
        shortname
      }
    }
  }
`;

export const GET_AUTH_USER = gql`
  query GetAuthUser {
    me {
      id
      name
      email
      mobile
      language
      country {
        id
        name
        phonecode
        shortname
      }
    }
  }
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
