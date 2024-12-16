const db = require('../config/db');

const User = {

  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  create: async (user) => {
    const { name, email, password } = user;
    const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      password,
    ]);
    return {
      id: result?.insertId,
      name,
      email,
    };
  },

  update: async (id, user) => {
    const { name, email, password } = user;
    await db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [
      name,
      email,
      password,
      id,
    ]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  },
};

module.exports = User;
