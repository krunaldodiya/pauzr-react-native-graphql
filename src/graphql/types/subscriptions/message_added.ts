import gql from 'graphql-tag';

export default gql`
  subscription MessageAdded {
    messageAdded {
      id
      text
      sender {
        id
        name
      }
    }
  }
`;
