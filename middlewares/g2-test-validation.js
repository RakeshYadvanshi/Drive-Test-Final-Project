module.exports = {
    ValidateUserInformation: (req, res, next) => {
        if (req.files == null || !req.body.LicenseNumber) {
            return res.redirect('/g2-test/failure')
        }
        next();
    }
}