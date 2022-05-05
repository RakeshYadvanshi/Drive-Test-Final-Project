$(document).ready(() => {
    $("#register-form").validate({
        rules: {
            Email: {
                required: true,
                email:true,
            },
            UserName: {
                required: true,
            },
            UserType: {
                required: true,
            },
            Password: {
                required: true,
                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{7,}$"
            },
            ConfirmPassword: {
                required: true,
                equalTo: "#register-password"
            },
        },
        messages: {
            Email: {
                required: "Email is required",
                email: "Invalid email format",
            },
            UserName: {
                required: "User name is required"
            },
            UserType: {
                required: "User type is required",
            },
            Password: {
                required: "Password is required",
                pattern: "Password should contain at least a capital letter, a small letter, a number, a special character and minimun length is 7 "
               
            },
            ConfirmPassword: {
                required: "Confirm Password is required" ,
                equalTo: "Password and Confirm Password does not match."
            },

        }
    });
    $("#login-form").validate({
        rules: {
            LoginUserName: {
                required: true,
            },
            LoginPassword: {
                required: true,
            }
        },
        messages: {
            LoginUserName: {
                required: "User name is required"
            },
            LoginPassword: {
                required: "Password is required",
            }
        }
    });
});