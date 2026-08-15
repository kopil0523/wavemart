const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      image: String,
      category: String,
      description: String,
      quantity: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  customer: {
    name: String,
    phone: String,
    address: String,
    city: String,
    zip: String,
  },
  paymentMethod: {
    type: String,
    default: "Credit Card",
  },
  cardLast4: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
