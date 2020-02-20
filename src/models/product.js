import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: false,
        default: "https://cell-only.com/wp-content/uploads/2016/09/product-image-unavailable.jpg"
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;