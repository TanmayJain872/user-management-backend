/* jshint esversion: 11 */

const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../../../server'); // Your Express app
const User = require('../../../../src/models/User.js');

    
// Test for createUser mutation
describe('createUser Mutation', () => {
    afterEach(() => {
        sinon.restore(); // Restore mocked methods after each test
    });

    it('should create a user successfully', async () => {
        const mockResponse = {
            id: '999',
            name: 'Ken Doe',
            email: 'ken.doe@gmail.com',
        };
        sinon.stub(User, 'create').resolves(mockResponse);

        const mutation = `
            mutation {
                createUser(name: "${mockResponse?.name}", email: "${mockResponse?.email}", password: "password123") {
                    id
                    name
                    email
                }
            }
        `;

        const response = await request(app).post('/graphql').send({ query: mutation });

        expect(response?.status).to.equal(200);
        expect(response?.body?.data?.createUser).to.deep.equal(mockResponse);
    });

    it('should return an error if email is already taken', async () => {
        sinon.stub(User, 'create').throws(new Error('User with same email already exists'));

        const mutation = `
            mutation {
                createUser(name: "Ken Doe", email: "ken.doe@gmail.com", password: "password123") {
                    id
                    name
                    email
                }
            }
        `;

        const response = await request(app).post('/graphql').send({ query: mutation });

        expect(response.status).to.equal(200);
        expect(response.body.errors).to.exist;
        expect(response.body.errors[0].message).to.equal('User with same email already exists');
    });
});