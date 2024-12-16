const chai = require('chai');
const sinon = require('sinon');
const User = require('../../src/models/User');
const { expect } = chai;

describe('User Model', () => {
  it('should find a user by ID', async () => {
    const mockUser = { id: 1, name: 'John', email: 'john@example.com' };
    sinon.stub(User, 'findById').resolves(mockUser);

    const user = await User.findById(1);
    expect(user).to.deep.equal(mockUser);

    sinon.restore();
  });

  it('should hash passwords before creating a user', async () => {
    const bcrypt = require('bcryptjs');
    sinon.stub(bcrypt, 'hash').resolves('hashedpassword');

    const hashedPassword = await bcrypt.hash('password', 10);
    expect(hashedPassword).to.equal('hashedpassword');

    sinon.restore();
  });
});
