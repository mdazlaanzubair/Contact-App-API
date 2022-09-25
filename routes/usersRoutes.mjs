import express from "express";
import {
  index,
  create,
  view,
  update,
  destroy,
} from "../controllers/usersController.mjs";

// invoking express router
const router = express.Router();

// routes to user controller
router.get("/index", index);
router.post("/create", create);
router.get("/view/", view);
router.put("/update/", update);
router.delete("/delete/", destroy);

// exporting router
export default router;
