import { Router } from "express";
import InsuranceRouter from "./Insurance";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/insurances", InsuranceRouter);

// Export the base-router
export default router;
