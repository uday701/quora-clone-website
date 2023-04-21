const express = require("express");
const router = express.Router();
const questionControllers = require("../controllers/questionControllers");
const postControllers = require("../controllers/postControllers");

const { verifyToken, optionallyVerifyToken } = require("../middleware/auth");
//router.get("/", optionallyVerifyToken, postControllers.getPosts);

router.get("/", optionallyVerifyToken, questionControllers.getQuestions);
router.post("/", verifyToken, questionControllers.createQuestion);

//router.get("/:id", optionallyVerifyToken, questionControllers.getPost);
//router.patch("/:id", verifyToken, questionControllers.updatePost);
router.delete("/:id", verifyToken, questionControllers.deleteQuestion);

module.exports = router;