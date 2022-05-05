module.exports ={
    UserName: function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            let errors= [];
            for (const iterator of Object.keys(error.keyPattern)) {
                errors.push(new Error(iterator + ' already Exists')) 
            }
            next(errors);
        } else {
            next();
        }
    }
} ;