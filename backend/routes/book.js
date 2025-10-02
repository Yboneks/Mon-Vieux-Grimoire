const express = require("express");
const auth = require("../middleware/auth.js");
const router = express.Router();
const multer = require("../middleware/multer-config.js");
const bookCtrl = require("../controllers/book.js");

router.get("/", bookCtrl.getAllBook);
router.get("/bestrating", bookCtrl.getBestRating);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, multer, bookCtrl.createBook);
router.put("/:id", auth, multer, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

module.exports = router;
