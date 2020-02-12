import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isChecked: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;