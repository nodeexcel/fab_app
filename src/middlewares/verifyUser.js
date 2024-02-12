import { verifyToken } from "../utils/user.js";


export const verifyUser = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(403).send({message:"anauthorized or access token missing"})
        const decodedUser = await verifyToken(token);
        if(!decodedUser) return res.status(401).send({message:"unauthorized"});
        req.user = decodedUser;
        next();
    } catch (error) {
        res.status(500).send({success:false, message:error.message});
    }
}

export const isAdmin = async(req, res, next) => {
    try {
        if(req.user.role !== process.env.ADMIN_ROLE) return res.status(401).send("You have not access to this resource")

        return next();
    } catch (error) {
        res.status(500).send({success:false, message:error.message});
    }
}