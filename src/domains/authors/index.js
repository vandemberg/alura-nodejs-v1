import express from "express";
import AuthorController from "./AuthorController.js";

const router = express.Router();
router.get("/", AuthorController.all);
router.post("/", AuthorController.create);
router.put("/:id", AuthorController.update);
router.get("/:id", AuthorController.getById);
router.delete("/:id", AuthorController.delete);

export default router;
