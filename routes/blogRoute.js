const express = require("express");
const router = express.Router();
const {
  blogSubmitController,
  blogUploadPhoto,
  getBlogById,
  getBlogs,
  blogCommentsSubmitController, 
  blogUpdateController,
  blogDeleteController
} = require("../controllers/blogController");
const isAuthorized = require("../middleware/auth");
router.get('/all',isAuthorized,getBlogs)
router.get('/:id',isAuthorized,getBlogById)
router.post("/submit",isAuthorized, blogSubmitController);
router.post("/update-blog",isAuthorized,blogUpdateController)
router.delete('/delete',isAuthorized,blogDeleteController)
router.post("/commentsubmit",isAuthorized,blogCommentsSubmitController)
router.post("/uploadPhoto",isAuthorized, blogUploadPhoto);
module.exports = router;
