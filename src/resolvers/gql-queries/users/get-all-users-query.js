import User from '../../../models/User.js';

export const getAllUsers = async (_, { id, email }) => {
    return await User.findAll();
};