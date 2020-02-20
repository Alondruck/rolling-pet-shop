import mongoose from 'mongoose';

const productSaleSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const saleSchema = new mongoose.Schema({
    products: [productSaleSchema],
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;