import express from "express";

import postCtrl from "../controllers/postCtrl.js";

const router = express.Router();

router.get("/", postCtrl.getPosts);
router.post("/", postCtrl.createPost);
router.patch("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);
router.patch("/:id/like-post", postCtrl.likePost);

export default router;
