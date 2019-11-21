import gql from 'graphql-tag';

export default gql`
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
