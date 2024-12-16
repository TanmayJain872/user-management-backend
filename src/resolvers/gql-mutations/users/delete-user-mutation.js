import User from '../../../models/User.js';

export const deleteUser = async (_, { id }) => {
    await User.delete(id);
    return `User with ID ${id} deleted.`;
};