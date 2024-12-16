const { getAllUsers } = require('src/resolvers/gql-queries/users/get-all-users-query.js');
const { getUser } = require('src/resolvers/gql-queries/users/get-user-query.js');

const { createUser } = require('src/resolvers/gql-mutations/users/create-user-mutation.js');
const { updateUser } = require('src/resolvers/gql-mutations/users/update-user-mutation.js');
const { deleteUser } = require('src/resolvers/gql-mutations/users/delete-user-mutation.js');

const userResolver = {
  Query: {
    getUser: getUser,
    getUsers: getAllUsers,
  },
  Mutation: {
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
  },
};

module.exports = userResolver;
