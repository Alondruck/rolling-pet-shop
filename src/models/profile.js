import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    lastname:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false
    },
    celphone: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;