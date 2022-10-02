import express from "express";
import {
  index,
  create,
  view,
  update,
  destroy,
} from "../controllers/contactsController.mjs";

// invoking express router
const router = express.Router();

// routes to contacts controller
router.get("/index", index);
router.get("/view/:id", view);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", destroy);

// exporting router
export default router;
