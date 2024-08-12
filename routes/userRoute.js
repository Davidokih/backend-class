const express = require("express");

const { userSignUp, getUsers, getSingleUser, userSignIn, userUpdate, uploadAvatar } = require("../controller/authController");
const auth = require('../utils/auth');
const upload = require('../utils/multer.js');

const router = express.Router();


router
    .route("/")
    .post(userSignUp)
    .get(getUsers);

router.route('/signin').post(userSignIn);
router.route('/update').patch(auth, userUpdate);
router.route('/upload').patch(auth, upload.single('avatar'), uploadAvatar);
router
    .route("/:id")
    .get(getSingleUser);

module.exports = router;