const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fullName: {type: String, default: ""},
    phone: {type: String, default: ""},
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {type: String},
        color: {type: String}
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
