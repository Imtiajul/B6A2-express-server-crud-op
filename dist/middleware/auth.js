"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const auth = (...roles) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; // 'bearer njksd;kfbsk;df;ksd'  ['bearer','jkasndknf']
        if (!token) {
            throw new Error("You are not authorized, token invalid");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        // console.log(decoded, roles);
        const user = await db_1.pool.query(`
      SELECT * FROM users WHERE email=$1
      `, [decoded.email]);
        if (user.rows.length === 0) {
            throw new Error("User not found!");
        }
        // console.log(roles.length)
        req.user = decoded;
        if (roles.length && !roles.includes(decoded.role)) {
            // throw new Error("You are not authorized");
            return res.status(403).json({
                success: false,
                message: "insufficient permissions",
            });
        }
        //check customer
        const cusResult = await db_1.pool.query(`SELECT * FROM users WHERE email = $1`, [req.user.email]);
        // console.log(cusResult);
        console.log(req.params.userId, cusResult.rows[0].id, decoded.role);
        if (req.params.userId && decoded.role === 'customer' && cusResult.rows[0].id !== req.params.userId) {
            // throw new Error("You can only update your profile");
            return res.status(403).json({
                success: false,
                message: "insufficient permissions.. You can only update your profile!!",
            });
        }
        next();
    };
};
exports.default = auth;
