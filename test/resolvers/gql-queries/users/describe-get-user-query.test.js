const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const User = require('../../../../src/models/User.js'); // Mocked User model
const { getUser } = require('../../../../src/resolvers/gql-queries/users/get-user-query.js'); // Resolver file

describe('GraphQL - getUser Resolver', () => {
  afterEach(() => {
    sinon.restore(); // Restore all stubs after each test
  });

  // Test case: Fetch user by ID
  it('should return user when ID is provided', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@gmail.com' };

    // Stub User.findById to return the mock user
    sinon.stub(User, 'findById').resolves(mockUser);

    const result = await getUser(null, { id: 1 });

    expect(User.findById.calledOnceWith(1)).to.be.true;
    expect(result).to.deep.equal(mockUser);
  });

  // Test case: Fetch user by email
  it('should return user when email is provided', async () => {
    const mockUser = { id: 2, name: 'Jane Doe', email: 'jane.doe@gmail.com' };

    // Stub User.findByEmail to return the mock user
    sinon.stub(User, 'findByEmail').resolves(mockUser);

    const result = await getUser(null, { email: 'jane.doe@gmail.com' });

    expect(User.findByEmail.calledOnceWith('jane.doe@gmail.com')).to.be.true;
    expect(result).to.deep.equal(mockUser);
  });

  // Test case: Return null if user does not exist by ID
  it('should return null if no user is found by ID', async () => {
    // Stub User.findById to return null
    sinon.stub(User, 'findById').resolves(null);

    const result = await getUser(null, { id: 99 });

    expect(User.findById.calledOnceWith(99)).to.be.true;
    expect(result).to.be.null;
  });

  // Test case: Return null if user does not exist by email
  it('should return null if no user is found by email', async () => {
    // Stub User.findByEmail to return null
    sinon.stub(User, 'findByEmail').resolves(null);

    const result = await getUser(null, { email: 'nonexistent@gmail.com' });

    expect(User.findByEmail.calledOnceWith('nonexistent@gmail.com')).to.be.true;
    expect(result).to.be.null;
  });

  // Test case: Return undefined if both ID and email are missing
  it('should return undefined if no ID or email is provided', async () => {
    const result = await getUser(null, {});

    expect(result).to.be.undefined;
  });

  // Test case: Handle errors from User.findById
  it('should throw an error if User.findById fails', async () => {
    // Stub User.findById to throw an error
    sinon.stub(User, 'findById').throws(new Error('Database error'));

    try {
      await getUser(null, { id: 1 });
    } catch (error) {
      expect(User.findById.calledOnceWith(1)).to.be.true;
      expect(error.message).to.equal('Database error');
    }
  });

  // Test case: Handle errors from User.findByEmail
  it('should throw an error if User.findByEmail fails', async () => {
    // Stub User.findByEmail to throw an error
    sinon.stub(User, 'findByEmail').throws(new Error('Database error'));

    try {
      await getUser(null, { email: 'error@gmail.com' });
    } catch (error) {
      expect(User.findByEmail.calledOnceWith('error@gmail.com')).to.be.true;
      expect(error.message).to.equal('Database error');
    }
  });
});
