import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';

export const createUser = async (_, { name, email, password }) => {
    console.log("🚀 ~ createUser ~ name:", name)
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ name, email, password: hashedPassword });
    console.log("🚀 ~ createUser ~ id:", result);
    return result;
};