import User from '../../../models/User.js';

export const deleteUser = async (_, { id }) => {
    try {
        const result = await User.delete(id);
        if (result.affectedRows === 0) {
            throw new Error("User not found");
        }
        return "User deleted successfully";
    } catch (error) {
        throw new Error(error.message);
    }
};