/* jshint esversion: 11 */

const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../../../server.js'); // Your Express app
const User = require('../../../../src/models/User.js');

describe('updateUser Mutation', () => {

    afterEach(() => {
        sinon.restore(); // Restore mocked methods after each test
    });

    it('should update a user successfully and return the updated user', async () => {
        const updatedUser = {
            id: "1",
            name: 'Updated John Doe',
            email: 'updated.john.doe@gmail.com',
        };

        sinon.stub(User, 'update').resolves({ affectedRows: 1 });
        sinon.stub(User, 'findById').resolves(updatedUser);

        const mutation = `
            mutation {
                updateUser(id: "1", name: "Updated John Doe", email: "updated.john.doe@gmail.com") {
                    id
                    name
                    email
                }
            }
        `;

        const response = await request(app).post('/graphql').send({ query: mutation });

        expect(response.status).to.equal(200);
        expect(response.body.data.updateUser).to.deep.equal(updatedUser);
    });

    it('should return an error if the user does not exist', async () => {
        sinon.stub(User, 'update').resolves({ affectedRows: 0 });

        const mutation = `
            mutation {
                updateUser(id: "99", name: "Unknown", email: "unknown@gmail.com") {
                    id
                    name
                    email
                }
            }
        `;

        const response = await request(app).post('/graphql').send({ query: mutation });

        expect(response.status).to.equal(200);
        expect(response.body.errors).to.exist;
        expect(response.body.errors[0].message).to.equal('User not found');
    });
});