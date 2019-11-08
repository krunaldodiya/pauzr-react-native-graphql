import {gql} from 'apollo-boost';

export const REQUEST_OTP = gql`
  mutation RequestOtp($mobile: String!) {
    requestOtp(mobile: $mobile)
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($mobile: String!, $otp: Int!) {
    verifyOtp(mobile: $mobile, otp: $otp) {
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
