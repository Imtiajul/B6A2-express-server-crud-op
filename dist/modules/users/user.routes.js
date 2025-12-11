"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("admin"), user_controller_1.userController.getAllUsers);
router.put("/:userId", (0, auth_1.default)("admin", "customer"), user_controller_1.userController.updateSingleUser);
router.delete("/:userId", (0, auth_1.default)("admin"), user_controller_1.userController.deleteSingleUser);
exports.useRoutes = router;
