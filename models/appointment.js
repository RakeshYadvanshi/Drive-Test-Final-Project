const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
    Date: String,
    Time: String,
    ExaminerId: {
        type: Schema.Types.ObjectId,
        default: null
    },
    ExamineeId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "User"
    },
    AppointmentType: {
        type: String,
        default:null
    },
    AppointmentStatus:{
        type: String,
        enum: ['Pending', 'Exam Started', 'Completed', 'No Show'],
        default: 'Pending'
    },
    TestObservationId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "TestObservation"
    },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;