const { gql } = require('graphql-tag');

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteUser(id: ID!): String
  }
`;

module.exports = userSchema;
