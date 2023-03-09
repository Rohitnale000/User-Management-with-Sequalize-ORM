const express = require("express");
const router = express.Router();
const {displayUserData, insertUserData, singleUserData, deleteUserData, updateUserData, paginationUserData}=require("../Controller/userController.js")


//student data display
router.get("/user",displayUserData);


//insert user data into db
router.post("/user",insertUserData)

//find single user from database
router.get("/user/:email",singleUserData)

//delete user from db
router.delete("/user/:id",deleteUserData)

//update data from db
router.put("/user/:id",updateUserData)


//pagination 
router.get("/user/page/limit",paginationUserData)

module.exports = router