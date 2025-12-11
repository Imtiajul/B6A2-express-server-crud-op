import { NextFunction, Request, Response } from "express"
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";

const auth = (...roles: ("admin" | "customer")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // 'bearer njksd;kfbsk;df;ksd'  ['bearer','jkasndknf']

    if (!token) {
      throw new Error("You are not authorized, token invalid");
    }
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    // console.log(decoded, roles);
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [decoded.email]
    );

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
    const cusResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [req.user!.email])
    // console.log(cusResult);
    // console.log(req.params.userId, cusResult.rows[0].id, decoded.role);

    if (req.params.userId && decoded.role ==="customer" && cusResult.rows[0].id.toString() !== req.params.userId) {
      // throw new Error("You can only update your profile");
      return res.status(403).json({
        success: false,
        message: "insufficient permissions.. You can only update/delete your profile!!",
      });
    }
    next();
  };
}
export default auth;