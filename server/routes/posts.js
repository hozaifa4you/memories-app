import express from "express";

import postCtrl from "../controllers/postCtrl.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();

router.get("/", postCtrl.getPosts);
router.post("/", authentication, postCtrl.createPost);
router.patch("/:id", authentication, postCtrl.updatePost);
router.delete("/:id", authentication, postCtrl.deletePost);
router.patch("/:id/like-post", authentication, postCtrl.likePost);

export default router;
