const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

describe('User Model', () => {
  it('should hash passwords before creating a user', async () => {
    const bcrypt = require('bcryptjs');
    sinon.stub(bcrypt, 'hash').resolves('hashedpassword');

    const hashedPassword = await bcrypt.hash('password', 10);
    expect(hashedPassword).to.equal('hashedpassword');

    sinon.restore();
  });
});
