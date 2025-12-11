import express from "express";
import auth from "../../middleware/auth";
import { vehicleController } from "./vehicle.controllers";

const router = express.Router();

// signup vehicle
router.post('/', auth('admin'), vehicleController.addVehicle);

router.get("/", vehicleController.getAllVehicle);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
router.put("/:vehicleId", auth("admin"), vehicleController.updateSingleVehicle);
router.delete("/:vehicleId", auth("admin"), vehicleController.deleteSingleVehicle);


export const vehiclehRoutes = router;