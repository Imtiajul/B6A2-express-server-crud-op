import bcrypt from 'bcryptjs';
import { pool } from "../../config/db";
import config from '../../config';
import jwt from 'jsonwebtoken';

const signUpUser = async (payload: Record<string, unknown>) => {
    const { name, role, email, phone, password } = payload;

    const hashedPass = await bcrypt.hash(password as string, 10);
    const result = await pool.query(`INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role]);

    return result;
}
const signInUser = async (email: string, password: string) =>  {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if(result.rowCount === 0) {
        throw new Error('User not found!!')
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw new Error('Wrong password, bro');
    }

    const secret = config.JWT_SECRET;

    const token = jwt.sign({name: user.name, email: user.email, role: user.role }, secret, { algorithm: 'HS256', expiresIn: '7d' });

    // console.log(token);

    return {token, user};
}
export const authSerivces = {
    signUpUser,
    signInUser,
}