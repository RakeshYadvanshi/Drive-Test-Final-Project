const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TestObservationSchema = new Schema({
    ExaminerId: {
        type: Schema.Types.ObjectId,
        default: null
    },
    AppointmentId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "Appointment"
    },
    ExamineeId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "User"
    },
    LeftTurn: Boolean,
    RightTurn: Boolean,
    ThreePointTurn: Boolean,
    UpHillParking: Boolean,
    DownHillParking: Boolean,
    ParellelParking: Boolean,
    CheckingBackMirror: Boolean,
    SpeedLimit: Boolean,
    OverAllResult: String,
    Comment: String
});

const TestObservation = mongoose.model('TestObservation', TestObservationSchema);
module.exports = TestObservation;