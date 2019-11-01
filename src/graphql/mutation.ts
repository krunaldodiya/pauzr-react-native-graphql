import {gql} from 'apollo-boost';

export const REQUEST_OTP = gql`
  mutation RequestOtp($mobile: String, $country: CountryInput) {
    otp: requestOtp(mobile: $mobile, country: $country)
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($otp: String, $country: CountryInput) {
    auth: verifyOtp(otp: $otp, country: $country) {
      token
      user {
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
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const REGISTER = gql`
  mutation Login($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const SET_AUTH_USER = gql`
  mutation SetAuthUser($authUser: User) @client {
    setAuthUser(authUser: $authUser) {
      user {
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
  }
`;

export const SET_INITIAL_SCREEN = gql`
  mutation SetInitialScreen($initialScreen: String!) @client {
    setInitialScreen(initialScreen: $initialScreen)
  }
`;

export const SET_AUTH_TOKEN = gql`
  query SetAuthToken($token: String!) @client {
    setAuthToken(token: $token)
  }
`;
