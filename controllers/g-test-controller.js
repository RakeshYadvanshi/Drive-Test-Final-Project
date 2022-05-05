const User = require('../models/user')
const Appointment = require('../models/appointment')
module.exports = {
    Get: {
        GTest: async (req, res) => {
            User.findOne({ _id: req.session.UId }, async (error, user) => {
                if (user.LicenseNumber == undefined) {
                    res.redirect("/g2-test");
                }

                let appiontment = await Appointment.findOne({ ExamineeId: req.session.UId, AppointmentType: "G" });
                var data = user;
                if (appiontment) {
                    data.AppointmentStatus = appiontment.AppointmentStatus;
                    data.Slot = appiontment.Date + " " + appiontment.Time;
                    data.HasTestResult = false;
                    if (appiontment.AppointmentStatus == 'Completed') {
                        data.HasTestResult = true;
                        data.ResultLink = "/exam-feedback/" + req.session.UId + "/" + appiontment._id
                    }
                }

                res.render("g-test",
                    {
                        "status": "UserFound",
                        data: data
                    });
            });

        }
    },
    Post: {
        UpdateGUserInformation: async (req, res) => {

            User.findOneAndUpdate({ _id: req.session.UId }, { Address: req.body.Address, CarDetail: req.body.CarDetail }, (error, user) => {
                Appointment.findOneAndUpdate({ _id: req.body.Slot },
                    {
                        ExamineeId: req.session.UId,
                        AppointmentType: "G"
                    }, (____er, appointment) => {
                        res.json({ "status": "ok" });
                    })
            })
        }
    }
}