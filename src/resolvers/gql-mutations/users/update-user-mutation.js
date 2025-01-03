import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';

export const updateUser = async (_, { id, name, email, password }) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    const data = {
        name,
        email,
    };
    if (password?.length) {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        data.password = hashedPassword;
    }
    await User.update(id, data);
    return await User.findById(id);
};

