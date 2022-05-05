const User = require('../models/user')
const Appointment = require('../models/appointment')
const path = require('path')
const fs = require('fs');
const bcrypt = require('bcrypt');
const settings = require('../settings');
const TestOberservation = require('../models/testobservation')
module.exports = {
    Get: {
        GTestResponse: async (req, res) => {

            User.findOne({ _id: req.session.UId }, async (error, user) => {
                if (user.LicenseNumber == undefined) {
                    user.Address = {};
                    user.CarDetail = {};
                }
                let appiontment = await Appointment.findOne({ ExamineeId: req.session.UId, AppointmentType: "G2" });
                var data = user;
                if (appiontment) {
                    data.AppointmentStatus = appiontment.AppointmentStatus;
                    data.Slot = appiontment.Date + " " + appiontment.Time;
                    data.HasTestResult = false;
                    if (appiontment.AppointmentStatus == 'Completed'){
                        data.HasTestResult = true;
                        data.ResultLink = "/exam-feedback/" + req.session.UId + "/" + appiontment._id
                    }
                }


                if (req.params.saved == 'success') {
                    res.render("g2-test", { "status": "success", data: data });
                } else if (req.params.saved == 'failure') {
                    res.render("g2-test", { "status": "failure", data: data });
                }
                else {
                    res.render("g2-test", { "status": "", data: data });
                }

            })



        },
        ExamFeedback: async (req, res) => {
            let appointment = await Appointment.findOne({ _id: req.params.AppointmentId });
            let examinee = await User.findOne({ _id: req.params.ExamineeId });
            let testObservations = await TestOberservation.findOne({
                AppointmentId: req.params.AppointmentId,
                ExamineeId: req.params.ExamineeId
            })
            if (testObservations == null) {
                testObservations = {};
            }
            res.render("exam-feedback", { data: { appointment, examinee, observation: testObservations } });
        }
    },
    Post: {
        ApplyForG2: async (req, res) => {

            let userDocumentDir = path.resolve('public/user-documents/', req.session.UId);
            if (!fs.existsSync()) {
                fs.mkdir(userDocumentDir, { recursive: true }, (err) => {
                    if (err) throw err;
                });
            }

            req.files.UserImage.mv(userDocumentDir + "/" + req.files.UserImage.name, async (_er) => {
                req.files.UserIdentity.mv(userDocumentDir + "/" + req.files.UserIdentity.name, async (__er) => {

                    req.body.UserDocument = {
                        UserImage: "/user-documents/" + req.session.UId + "/" + req.files.UserImage.name,
                        UserIdentity: "/user-documents/" + req.session.UId + "/" + req.files.UserIdentity.name
                    }
                    req.body.LicenseNumber = await bcrypt.hash(req.body.LicenseNumber, settings.EncryptionSaltRounds);

                    User.findOneAndUpdate({ _id: req.session.UId }, { ...req.body }, (___er, user) => {
                        if (___er == null) {
                            Appointment.findOneAndUpdate({ _id: req.body.Slot },
                                {
                                    ExamineeId: req.session.UId,
                                    AppointmentType: "G2"
                                }, (____er, appointment) => {
                                    res.redirect("/g2-test/success");
                                })
                        }
                        else {
                            res.redirect("/g2-test/failure");
                        }

                    })
                });
            });




        }
    }
}