const mongoose = require('mongoose');
const { EcnryptLicenseNumber, EncryptDateOfBirth, ProcessBeforeSave } = require('../middlewares/encrypt-user');
const userSchemaValdiations = require('../middlewares/user-schema-valdiations');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    DateOfBirth:String,
    LicenseNumber: String,
    Password: {
        type: String,
        required: true,
    },
    UserName : {
        type:String,
        required:true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    UserType:String,
    Address:new Schema({
        HouseNo:String,
        Street:String,
        City:String,
        Province:String,
        PostalCode:String,
    }),
    CarDetail:new Schema({
        Make:String,
        Model:String,
        Year:String,
        PlatNumber:String
    }),
    UserDocument: new Schema({
        UserImage: String,
        UserIdentity: String
    })
});

UserSchema.pre('save', ProcessBeforeSave);
UserSchema.post('save', userSchemaValdiations.UserName);
const User = mongoose.model('User', UserSchema);
module.exports = User;