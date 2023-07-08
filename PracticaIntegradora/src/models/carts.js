import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    id: {
        type: Number,
        required: true
    }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
