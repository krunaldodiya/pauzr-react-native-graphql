import {gql} from 'apollo-boost';

export const SET_INITIAL_SCREEN = gql`
  mutation SetInitialScreen($initialScreen: String) {
    setInitialScreen(initialScreen: $initialScreen) @client
  }
`;

export const SET_COUNTRY = gql`
  mutation SetCountry($country: Country) {
    setCountry(country: $country) @client
  }
`;
