const Appointment = require('../models/appointment')
module.exports = {
    Get: {
        AdminAppointment: async (req, res) => {
            res.render("admin-appointment", { status: "" });
        },
        AdminDriverListView: async (req, res) => {
            res.render("admin-driver-list", { status: "" });
        },
    },
    Post: {
        AddAppointment: async (req, res) => {
            let appointment = {
                Date: req.body.Date,
                Time: req.body.Time
            };
            Appointment.create(appointment);
            return res.json({
                status: "1"
            })
        },
        GetAdminAppointmentByDate: async (req, res) => {
            Appointment.find({ Date: req.body.Date }, (error, appointments) => {
                return res.json({
                    Status: "1",
                    Data: appointments
                })
            });
        },
        DeleteAppointment: async (req, res) => {
            Appointment.findOneAndRemove({ _id: req.body.Id }, (error, appointments) => {
                return res.json({
                    status: "1"
                })
            });
        },
        GetAvailableAppointmentByDate: async (req, res) => {
            Appointment.find({ Date: req.body.Date, Examinee: null }, (error, appointments) => {
                return res.json({
                    Status: "1",
                    Data: appointments
                })
            });
        },
        AdminDriverList: async (req, res) => {

            Appointment.find(
                {
                    Date: {
                        $gte: req.body.StartDate,
                        $lte: req.body.EndDate
                    },
                    ExamineeId: { $ne: null }
                }
            )
                .select('Date Time AppointmentType AppointmentStatus')
                .populate(
                    [
                        {
                            path: 'TestObservationId',
                            select: "OverAllResult"
                        },
                        {
                            path: 'ExamineeId',
                            select: "FirstName LastName"
                        }
                    ]
                ).exec((error, appointments) => {
                    return res.json({
                        Status: "1",
                        Data: appointments
                    })
                });


        },
    }
}