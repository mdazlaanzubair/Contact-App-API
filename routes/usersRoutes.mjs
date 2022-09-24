import express from "express";
import {
  list_users,
  add_user,
  show_user,
  edit_user,
  delete_user,
} from "../controllers/usersController.mjs";

// invoking express router
const router = express.Router();

// routes to user controller
router.get("/index", list_users);
router.post("/create", add_user);
router.get("/view/:id", show_user);
router.put("/edit/:id", edit_user);
router.delete("/delete/:id", delete_user);

// exporting router
export default router;
