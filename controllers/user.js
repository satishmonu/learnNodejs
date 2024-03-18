const { model } = require("mongoose");
const User = require("../models/user");

async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({});
    return res.status(200).json({msg: "Data Fetched", data: allDbUsers});
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
    
    if(!user){
        return res.status(404).json({ msg: "No User Found"});
    }
    return res.status(200).json({msg: "User Found", data: user});
}

async function handlePostByUser(req, res){
    const body = req.body;
    if (
      !body || 
      !body.first_name || 
      !body.last_name || 
      !body.email || 
      !body.gender || 
      !body.job_title
    ) {

        return res.status(400).json({msg : "All Feilds are Manatory."})
    }
    
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    console.log(result);

    return res.status(201).json({msg: "Success", data: result})
}
async function handleUpdateUserById(req, res){
    
     await User.findByIdAndUpdate(req.params.id, {lastName: "Gupta"});
     
     return res.status(200).json({status: "Success", msg: "Updated Successfully"});
}

async function handleDeleteUserById(req, res){

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({status: "Success", msg: "Deleted Successfully"});

}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handlePostByUser,
    handleUpdateUserById,
    handleDeleteUserById,



}