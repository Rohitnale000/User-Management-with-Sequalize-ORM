const {displayUserDataService, insertUserDataService, getSingleDataService, deleteUserDataService, updateUserDataService, paginationDataService} = require("../Services/userService.js")


const  displayUserData = async(req, res) => {
   const result = await displayUserDataService();
   //console.log(result);
   if(result){
      res.status(200).send(result)
   }else{
      res.send("Something is wrong")
   }
}


const insertUserData=async(req,res)=>{
  // console.log(req.body);
   const result = await insertUserDataService(req.body)
   console.log(result);
   if(result===true){
      res.status(200).send("User Inserted Successfully")
   }else{
      res.send("Something is wrong")
   }
}


const singleUserData=async(req,res)=>{
   //console.log(req.params.email);
   const result = await getSingleDataService(req.params.email)
   if(result){
      res.status(200).send(result)
   }else{
      res.send("Something is wrong")
   }

}

const deleteUserData=async(req,res)=>{
   // console.log(req.params.id);
   const result =await deleteUserDataService(req.params.id)
   console.log(result);
   if(result){
      res.status(200).send("User Deleted Successfully")
   }else{
      res.send("Something is wrong")
   }
}

const updateUserData=async(req,res)=>{
   console.log(req.params.id);
   try {
      const result = await updateUserDataService(req.params.id,req.body)
      if(result){
         res.status(200).send("User Updated Successfully")
      }else{
         res.send("Something is wrong")
      }
   } catch (error) {
      console.log(error);
   }
}


const paginationUserData = async(req,res)=>{

   const result = await paginationDataService(req.query.page,req.query.limit)
   if(result.totalCount>0){
      res.send(result)
   }else{
      res.send("data not found")
   }

}

module.exports ={displayUserData,insertUserData,singleUserData,deleteUserData,updateUserData,paginationUserData}