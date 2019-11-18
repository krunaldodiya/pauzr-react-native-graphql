import {gql} from 'apollo-boost';
import {USER_INFO_FRAGMENT} from './fragment';

export const REQUEST_OTP = gql`
  mutation RequestOtp($mobile: String!) {
    requestOtp(mobile: $mobile)
  }
`;

export const TOGGLE_FOLLOW = gql`
  mutation ToggleFollow($following_id: ID!) {
    toggleFollow(following_id: $following_id)
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $id: ID!
    $category_id: ID!
    $type: String!
    $description: String
    $attachments: [AttachmentInput!]!
  ) {
    createPost(
      id: $id
      category_id: $category_id
      type: $type
      description: $description
      attachments: $attachments
    ) {
      id
      type
      description
      published
      attachments {
        id
      }
      owner {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($mobile: String!, $otp: Int!) {
    verifyOtp(mobile: $mobile, otp: $otp) {
      token
      user {
        ...UserInfo
      }
    }
  }

  ${USER_INFO_FRAGMENT}
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...UserInfo
      }
    }
  }

  ${USER_INFO_FRAGMENT}
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
      ...UserInfo
    }
  }

  ${USER_INFO_FRAGMENT}
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
        ...UserInfo
      }
    }
  }

  ${USER_INFO_FRAGMENT}
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
