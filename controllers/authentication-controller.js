const bcrypt = require('bcrypt');
const User = require('../models/user')

const PrepareSession = (req, user) => {
    req.session.UId = user._id;
    req.session.UserType = user.UserType;
}
module.exports = {
    Get: {
        Login: async (req, res) => {
            res.render("login", { status: "", ConfirmPasswordError: false, errors: [] });
        },
        Register: async (req, res) => {
            res.render("login", { status: "", ConfirmPasswordError: false, errors: [] });
        },
        Logout: async (req, res) => {
            req.session.destroy(() => {
                res.redirect("/login");
            })
        }
    },
    Post: {
        Register: async (req, res) => {
            if (req.body.Password == req.body.ConfirmPassword) {

                var userObj = {
                    UserName: req.body.UserName,
                    UserType: req.body.UserType,
                    Password: req.body.Password,
                    Email: req.body.Email
                }
                User.create(userObj, (___er, user) => {
                    if (___er == null) {
                        PrepareSession(req, user);
                        res.render("login", { status: "UserCreated", errors: [] });
                    }
                    else {
                        res.render("login", { status: "validationError", errors: ___er });
                    }

                });

            } else {
                res.render("login", { ...req.body, status: "validationError", errors: ["Password and Confirm Password does not match."] });
            }


        },
        Login: async (req, res) => {
            let searchopt = {};
            if (req.body.LoginUserName)
                searchopt.UserName = req.body.LoginUserName.toLowerCase();


            User.findOne(searchopt, async (error, user) => {
                if (user) {
                    let result = await bcrypt.compare(req.body.LoginPassword, user.Password)

                    if (result) {
                        PrepareSession(req, user);
                        let redirectionPage = "";
                        if (user.UserType == "Driver") {
                            redirectionPage = "dashboard";
                        }
                        else if (user.UserType == "Admin") {
                            redirectionPage = "admin-driver-list";
                        }
                        else if (user.UserType == "Examiner") {
                            redirectionPage = "examiner";
                        }
                        res.redirect(redirectionPage);
                    }
                    else {
                        res.render("login",
                            {
                                "status": "InvalidCredentials"
                            }
                        );
                    }

                } else {
                    res.render("login",
                        {
                            "status": "UserNotFound"
                        }
                    );
                }

            })
        }
    }
}