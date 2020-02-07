import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date:{
        type: Number,
        required: true
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;