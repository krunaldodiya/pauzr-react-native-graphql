import {gql} from 'apollo-boost';

export const REQUEST_OTP = gql`
  mutation requestOtp($mobile: String, $country: CountryInput) {
    otp: requestOtp(mobile: $mobile, country: $country)
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOtp($otp: String, $country: CountryInput) {
    auth: verifyOtp(otp: $otp, country: $country) {
      access_token
      user {
        id
        name
      }
    }
  }
`;

export const SET_AUTH_USER = gql`
  mutation SetAuthUser(
    $initialScreen: String
    $authToken: String
    $selectedCountry: Country
    $selectedLanguage: String
  ) {
    setAuthUser(
      initialScreen: $initialScreen
      authToken: $authToken
      selectedCountry: $selectedCountry
      selectedLanguage: $selectedLanguage
    ) @client
  }
`;
