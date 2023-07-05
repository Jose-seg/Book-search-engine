const { mergeTypeDefs } = require('@graphql-tools/merge');
const userTypeDefs = require('./user');
const bookTypeDefs = require('./book');

const typeDefs = mergeTypeDefs([userTypeDefs, bookTypeDefs]);

module.exports = typeDefs;