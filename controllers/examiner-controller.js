const Appointment = require('../models/appointment')
const User = require('../models/user')
const TestOberservation = require('../models/testobservation')
module.exports = {
    Get: {
        ExaminerView: async (req, res) => {
            res.render("examiner", { status: "" });
        },
        TakeExam: async (req, res) => {
            let appointment = await Appointment.findOne({ _id: req.params.AppointmentId });
            if (appointment.AppointmentStatus == 'Pending') {
                await Appointment.findOneAndUpdate({ _id: req.params.AppointmentId }, { AppointmentStatus: "Exam Started" });
            }
            let examinee = await User.findOne({ _id: req.params.ExamineeId });
            let testObservations = await TestOberservation.findOne({
                AppointmentId: req.params.AppointmentId,
                ExamineeId: req.params.ExamineeId
            })
            if (testObservations == null) {
                testObservations = {};
            }
            res.render("take-exam", { data: { appointment, examinee, observation: testObservations } });
        },
    },
    Post: {
        GetPendingAppointment: async (req, res) => {
            Appointment.find({ Date: req.body.Date, ExamineeId: { $ne: null } }).select('Date Time AppointmentType AppointmentStatus').populate('ExamineeId', "FirstName LastName").exec((error, appointments) => {
                return res.json({
                    Status: "1",
                    Data: appointments
                })
            });
        },
        SaveTestObservations: async (req, res) => {
            console.log(req.body);
            var alreadyExist = await TestOberservation.findOne({
                AppointmentId: req.body.AppointmentId,
                ExamineeId: req.body.ExamineeId
            })
            if (alreadyExist == null) {
                var observation = req.body;
                observation.ExaminerId = req.session.UId;

                TestOberservation.create(observation, async function (er, obs) {
                    await Appointment.findOneAndUpdate({ _id: req.body.AppointmentId }, { AppointmentStatus: "Completed", TestObservationId:obs._id });
                    res.json({
                        Status: "1"
                    })
                });
            } else {
                res.json({
                    Status: "0",
                    Message: "Already Save. Can't be Update without Admin permission"
                })
            }

        },
        UpdateAppointmentNoShow: async function(req,res){
            await Appointment.findOneAndUpdate({ _id: req.body.AppointmentId }, { AppointmentStatus: 'No Show' });
            res.json({
                Status: "1"
            })
        }
    }
}