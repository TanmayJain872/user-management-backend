import User from '../../../models/User.js';

export const getUser = async (_, { id, email }) => {
    if (id) {
        return await User.findById(id);
    } else if (email?.length) {
        return await User.findByEmail(email);
    }
};