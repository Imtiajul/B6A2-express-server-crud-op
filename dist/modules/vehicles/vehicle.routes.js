"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclehRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const vehicle_controller_1 = require("./vehicle.controller");
const router = express_1.default.Router();
// signup vehicle
router.post('/', (0, auth_1.default)('admin'), vehicle_controller_1.vehicleController.addVehicle);
router.get("/", vehicle_controller_1.vehicleController.getAllVehicle);
router.get("/:vehicleId", vehicle_controller_1.vehicleController.getSingleVehicle);
router.put("/:vehicleId", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.updateSingleVehicle);
router.delete("/:vehicleId", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.deleteSingleVehicle);
exports.vehiclehRoutes = router;
