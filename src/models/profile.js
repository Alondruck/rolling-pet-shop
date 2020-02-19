import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    celphone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;