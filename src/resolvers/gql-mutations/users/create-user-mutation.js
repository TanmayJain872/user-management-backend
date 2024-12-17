import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';

export const createUser = async (_, { name, email, password }) => {
    const user = await User.findByEmail(email);
    if (user) {
        throw new Error("User with same email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ name, email, password: hashedPassword });
    return result;
};