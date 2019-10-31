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
      data {
        id
        name
        email
        created_at
      }
      paginatorInfo {
        perPage
        total
        hasMorePages
        currentPage
        lastPage
      }
    }
  }
`;

export const GET_AUTH_USER = gql`
  query AuthUser @client {
    auth {
      initialScreen
      authToken
      selectedCountry {
        id
        name
        phonecode
        shortname
      }
      selectedLanguage
    }
  }
`;
