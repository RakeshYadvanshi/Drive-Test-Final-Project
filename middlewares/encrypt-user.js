const settings = require('../settings');
const bcrypt = require('bcrypt');
module.exports = {
    ProcessBeforeSave: function (next) {
        let user = this;
        if (user.Password) {
            bcrypt.hash(user.Password, settings.EncryptionSaltRounds, function (err, pwdHash) {
                user.Password = pwdHash;
                user.Email = user.Email.toLowerCase();
                user.UserName = user.UserName.toLowerCase();
                next();
            });
        } else {
            next();
        }

    }
}