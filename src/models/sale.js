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
    products: [productSaleSchema]
});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;