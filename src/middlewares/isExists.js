import { userServices } from "../api/services/user/user.service.js";
import bcrypt from 'bcrypt';


export const isExist = async(req, res, next)=>{
    try {
        const user = await userServices.fetchUserByEmail(req.body.email);
        if(user){
            if(req.path.includes('/signup')) return res.status(409).send({message:"User already exists"})
            else{
              if(! await bcrypt.compare(req.body.password, user.password))
                return res.status(403).send({message:"email or password is incorrect"})
                req.user = user
                next()
            }
        }else{
            if(req.path.includes('/signin')) return res.status(404).send({message:"User not found"})
            else{
              if(req.body.password!==req.body.confirmPassword)
                 return res.status(403).send({message:"password and confirm password does not match"})
  
                 next()
            }
        }
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}