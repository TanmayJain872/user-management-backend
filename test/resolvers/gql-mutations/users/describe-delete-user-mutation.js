/* jshint esversion: 11 */

const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../../../server'); // Your Express app
const User = require('../../../../src/models/User.js');

describe('GraphQL - deleteUser Mutation', () => {
    afterEach(() => {
        sinon.restore(); // Reset stubs after each test
    });

    it('should delete a user successfully', async () => {
        // Mock the User.delete method
        sinon.stub(User, 'delete').resolves({ affectedRows: 1 });

        const mutation = `
            mutation {
                deleteUser(id: "1")
            }
        `;

        const response = await request(app)
        .post('/graphql')
        .send({ query: mutation });

        expect(response.status).to.equal(200);
        expect(response.body.data.deleteUser).to.equal("User deleted successfully");
    });

    it('should return an error if the user does not exist', async () => {
        // Mock the User.delete method to simulate a "not found" scenario
        sinon.stub(User, 'delete').resolves({ affectedRows: 0 });

        const mutation = `
            mutation {
            deleteUser(id: "999")
            }
        `;

        const response = await request(app)
            .post('/graphql')
            .send({ query: mutation });

        expect(response.status).to.equal(200);
        expect(response.body.errors).to.exist;
        expect(response.body.errors[0].message).to.equal("User not found");
    });
});
