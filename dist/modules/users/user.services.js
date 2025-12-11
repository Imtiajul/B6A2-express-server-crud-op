"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSerivces = void 0;
const db_1 = require("../../config/db");
const getAllUsers = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const updateSingleUser = async (payload, id) => {
    const { name, email, phone, role } = payload;
    const result = await db_1.pool.query(`UPDATE users SET name=COALESCE($1,name), email=COALESCE($2,email), phone=COALESCE($3,phone), role=COALESCE($4,role) WHERE id = $5 RETURNING *`, [name, email, phone, role, id]);
    return result;
};
const deleteSingleUser = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    return result;
};
exports.userSerivces = {
    getAllUsers,
    updateSingleUser,
    deleteSingleUser
};
