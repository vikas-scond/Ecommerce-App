import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",

            }
        ],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Proccesing", "Shipped", "delivered", "cancel"]
        }
    }, { timestamps:true }
);

export default mongoose.model('Order', orderSchema)