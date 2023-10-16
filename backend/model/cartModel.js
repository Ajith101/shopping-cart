const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          price: Number,
          description: { type: String, required: true },
          rating: { rate: { type: Number }, count: { type: Number } },
          category: { type: String, required: true },
          image: { type: String, required: true },
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required"],
    },
    totalPrice: Number,
  },
  { timestamp: true }
);

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
