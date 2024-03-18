const express = require("express");

const { 
    handleGetAllUsers,
    handleGetUserById,
    handlePostByUser,
    handleUpdateUserById,
    handleDeleteUserById,
 } = require('../controllers/user');

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handlePostByUser);

// Routes for ALL Common Routes Method
router
    .route("/:id")
    .get(handleGetUserById)
    .post(handlePostByUser)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);


module.exports = router;