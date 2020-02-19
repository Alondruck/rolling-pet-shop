import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    // email: {
    //     type: String,
    //     required: true
    // },
    // body: {
    //     type: String,
    //     required: true
    // },
    // date: {
    //     type: Date,
    //     required: true,
    //     default: Date.now()
    // },
    // isChecked: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // }
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
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;