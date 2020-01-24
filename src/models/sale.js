import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Sale = mongoose.model('Sale', saleSchema);

export default saleSchema;