const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const User = require('../../../../src/models/User.js'); // Mocked User model
const { getAllUsers } = require('../../../../src/resolvers/gql-queries/users/get-all-users-query.js'); // Resolver file

describe('GraphQL - getAllUsers Resolver', () => {
  afterEach(() => {
    sinon.restore(); // Restore all stubs after each test
  });

  // Test case: Return all users successfully
  it('should return a list of users', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john.doe@gmail.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@gmail.com' },
    ];

    // Stub User.findAll to return the mock users
    sinon.stub(User, 'findAll').resolves(mockUsers);

    const result = await getAllUsers();

    expect(User.findAll.calledOnce).to.be.true;
    expect(result).to.deep.equal(mockUsers);
  });

  // Test case: Return an empty list when no users exist
  it('should return an empty list if no users are found', async () => {
    // Stub User.findAll to return an empty array
    sinon.stub(User, 'findAll').resolves([]);

    const result = await getAllUsers();

    expect(User.findAll.calledOnce).to.be.true;
    expect(result).to.deep.equal([]);
  });

  // Test case: Handle errors when User.findAll throws an exception
  it('should throw an error if User.findAll fails', async () => {
    // Stub User.findAll to throw an error
    sinon.stub(User, 'findAll').throws(new Error('Database error'));

    try {
      await getAllUsers();
    } catch (error) {
      expect(User.findAll.calledOnce).to.be.true;
      expect(error.message).to.equal('Database error');
    }
  });
});
