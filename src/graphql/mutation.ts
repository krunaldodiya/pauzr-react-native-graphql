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

export const EDIT_PROFILE = gql`
  mutation EditProfile(
    $name: String
    $language: String
    $dob: String
    $gender: String
    $avatar: String
    $bio: String
    $username: String
  ) {
    editProfile(
      name: $name
      language: $language
      dob: $dob
      gender: $gender
      avatar: $avatar
      bio: $bio
      username: $username
    ) {
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

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $name: String!
    $mobile: String!
    $country_id: String!
  ) {
    register(
      email: $email
      password: $password
      name: $name
      mobile: $mobile
      country_id: $country_id
    ) {
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
