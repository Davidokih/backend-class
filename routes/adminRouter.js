const express = require("express");

const { userSignUp, getUsers, getSingleUser, userSignIn, userUpdate, getAllUsers } = require("../controller/adminController");
const auth = require('../utils/auth');
const router = express.Router();

router
    .route("/")
    .post(userSignUp)
    .get(getUsers);

router.route('/signin').post(userSignIn);
router.route('/update').patch(auth, userUpdate);
router.route('/users').get(auth, getAllUsers);

router
    .route("/:id")
    .get(getSingleUser);


module.exports = router;