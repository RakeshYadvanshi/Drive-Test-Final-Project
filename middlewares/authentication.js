module.exports.UserLoginValidation = (req, res, next) => {
    if (IsUserLoggedIn) {
        next();
    } else {
        res.redirect("/login");
    }

}
module.exports.DriverUserTypeValidation = (req, res, next) => {
    if (IsUserLoggedIn && LoginedUserType == "Driver") {
        next();
    } else {
        res.redirect("/login");
    }

}
module.exports.AdministratorUserTypeValidation = (req, res, next) => {
    if (IsUserLoggedIn && LoginedUserType == "Admin") {
        next();
    } else {
        res.redirect("/login");
    }

}
module.exports.ExaminerUserTypeValidation = (req, res, next) => {
    if (IsUserLoggedIn && LoginedUserType == "Examiner") {
        next();
    } else {
        res.redirect("/login");
    }

}