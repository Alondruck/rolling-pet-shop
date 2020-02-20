import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;