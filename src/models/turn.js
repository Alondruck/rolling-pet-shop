import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    lastname:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    species: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;