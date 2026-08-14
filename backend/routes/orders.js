const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ============ CREATE ORDER ============
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { items, total, customer, cardLast4 } = req.body;

    const order = new Order({
      userId: req.userId,
      orderId: "WM-" + Date.now(),
      items,
      total,
      customer,
      cardLast4,
      date: new Date(),
    });

    await order.save();

    res.status(201).json({
      message: "Order saved successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ============ GET USER'S ORDERS ============
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;