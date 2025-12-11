import { pool } from "../../config/db";

const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

const updateSingleUser = async (payload: Record<string, unknown>, id: string) => {
    const {name, email, phone, role} = payload;

    const result = await pool.query(`UPDATE users SET name=COALESCE($1,name), email=COALESCE($2,email), phone=COALESCE($3,phone), role=COALESCE($4,role) WHERE id = $5 RETURNING *`, [name, email, phone, role, id]);

    return result;
}
const deleteSingleUser = async (id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    return result;
}
export const userSerivces = {
    getAllUsers,
    updateSingleUser,
    deleteSingleUser
}