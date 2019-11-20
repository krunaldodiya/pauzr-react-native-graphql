module.exports = {
  client: {
    name: 'pauzr',
    tagName: 'gql',
    includes: ['src/**/*.{ts,tsx}'],
    excludes: ['src/generated/**', 'node_modules/**'],
    service: {
      name: 'pauzr',
      url: 'https://pauzr.tk/graphql',
    },
  },
};
