import mongoose from 'mongoose'
const Schema = mongoose.Schema

const turnSchema = new Schema({
    namePet: {
        type: String,
        trim : true
    },
    nameOwner: {
        type: String, 
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    symptom: {
        type: String, 
        trim: true
    }
})

export default mongoose.model('Turn', turnSchema)