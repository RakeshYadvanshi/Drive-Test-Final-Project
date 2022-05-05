module.exports =(req,res,next)=>{
    IsUserLoggedIn = req.session.UId;
    LoginedUserType = req.session.UserType;
    next();
}