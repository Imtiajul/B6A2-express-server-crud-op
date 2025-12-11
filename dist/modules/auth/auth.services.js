"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSerivces = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUpUser = async (payload) => {
    const { name, role, email, phone, password } = payload;
    const hashedPass = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role]);
    return result;
};
const signInUser = async (email, password) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (result.rowCount === 0) {
        throw new Error('User not found!!');
    }
    const user = result.rows[0];
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match) {
        throw new Error('Wrong password, bro');
    }
    const secret = config_1.default.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ name: user.name, email: user.email, role: user.role }, secret, { algorithm: 'HS256', expiresIn: '7d' });
    // console.log(token);
    return { token, user };
};
exports.authSerivces = {
    signUpUser,
    signInUser,
};
