import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        default: "notUser"
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
        required: true,
        default: Date.now()
    },
    message: {
        type: String,
        required: true
    },
    isChecked: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;