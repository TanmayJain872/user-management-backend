import User from '../../../models/User.js';

export const getAllUsers = async () => {
    return await User.findAll();
};