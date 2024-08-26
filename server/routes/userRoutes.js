import express from "express";
import {
  createUser,
  checkEmailExists,
  loginUser,
  logoutUser,
  fetchUserById
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/email/:email", checkEmailExists);
router.post("/login", loginUser);
router.post('/logout',logoutUser);
router.get('/:id', fetchUserById);
export default router;
