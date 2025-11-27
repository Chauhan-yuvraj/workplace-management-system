import { Router } from "express";
import {
  GetEmployees,
  PostEmployee,
  GetEmployee,
  DeleteEmployee,
  UpdateEmployee,
  GetMe,
  GetActiveHostList,
  BulkImportEmployees
} from "../controllers/Employee.controller";

const router = Router();

router.get("/me" , GetMe)

// 2. For lightweight Kiosk Dropdown (Name, Avatar, ID only)
router.get("/active-list", GetActiveHostList);

// 3. For onboarding (CSV Import)
router.post("/import", BulkImportEmployees);

router
  .route("/")
  .get(GetEmployees)   // GET all employees
  .post(PostEmployee); // Create employee

router
  .route("/:id")
  .get(GetEmployee)     // GET one employee
  .patch(UpdateEmployee) // Update employee
  .delete(DeleteEmployee); // Delete employee

export default router;
