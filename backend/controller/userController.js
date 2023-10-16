const asyncHandler = require("../middleware/asyncHandler");
const userModel = require("../model/userModel");
const cartModel = require("../model/cartModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwt");

//  /api/user/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({ success: false, message: "Invalid Credential" });
  } else {
    const isExist = await userModel.findOne({ email });
    if (!isExist) {
      res.status(401).json({ success: false, message: "Invalid Credential" });
    }
    const checkPassword = isExist.verifyPassword;
    if (checkPassword) {
      sendToken(isExist, res);
    } else {
      res.status(400).json({ success: false, message: "Invalid Credential" });
    }
  }
});

const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(401).json({ success: false, message: "Invalid credential" });
  }
  const isExist = await userModel.findOne({ email });
  if (!isExist) {
    const newUser = await userModel.create(req.body);
    sendToken(newUser, res);
  } else {
    res.status(400).json({ success: false, message: "Mail already exists" });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logout successfully" });
});

const addCart = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { id } = req.body.product;
  const cart = await cartModel.findOne({ user: userId });
  if (cart) {
    const productExist = cart.cartItems.findIndex(
      (item) => item.product.id == id
    );
    if (productExist !== -1) {
      await cartModel.findOneAndUpdate(
        { user: userId, "cartItems.product.id": id },
        { $inc: { "cartItems.$.quantity": 1 } },
        { new: true }
      );
      const updatedProduct = await cartModel.findOne({ user: userId });
      res.status(200).json({
        message: "Added Cart",
        total: updatedProduct?.cartItems?.length,
      });
    } else {
      const addNewProduct = await cartModel.findOneAndUpdate(
        { user: userId },
        { $push: { cartItems: { product: { ...req.body.product } } } },
        { new: true }
      );
      res.status(200).json({
        message: "Added Cart",
        total: addNewProduct?.cartItems?.length,
      });
    }
  } else {
    const product = await cartModel.create({
      user: userId,
      cartItems: [{ product: { ...req.body.product } }],
    });
    res.status(200).json({
      message: "Added Cart",
      total: product?.cartItems?.length,
    });
  }
});

const removeCart = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { id } = req.body;
  const cart = await cartModel.findOne({
    user: userId,
    "cartItems.product.id": id,
  });
  if (cart) {
    const response = await cartModel.findOneAndUpdate(
      {
        user: userId,
        "cartItems.product.id": id,
      },
      { $pull: { cartItems: { "product.id": id } } },
      { new: true }
    );
    res.status(200).json({
      message: "Item removed from cart",
      total: response?.cartItems?.length,
    });
  } else {
    res.status(404);
    throw new Error("item not found");
  }
});

const addCartQty = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId } = req.body;
  const cart = await cartModel.findOne({
    user: userId,
    "cartItems.product.id": productId,
  });
  if (cart) {
    await cartModel.findOneAndUpdate(
      { "cartItems.product.id": productId },
      { $inc: { "cartItems.$.quantity": 1 } },
      { new: true }
    );
    res.status(200).json({ message: "Added qty" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const decreaseCartQty = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId } = req.body;
  const cart = await cartModel.findOne({
    user: userId,
    "cartItems.product.id": productId,
  });
  if (cart) {
    await cartModel.findOneAndUpdate(
      { "cartItems.product.id": productId },
      { $inc: { "cartItems.$.quantity": -1 } },
      { new: true }
    );
    res.status(200).json({ message: "Decreased qty" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req;
  const cart = await cartModel.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error("Item not found");
  } else {
    res.status(200).json(cart);
  }
});

const getCartNumber = asyncHandler(async (req, res) => {
  const { userId } = req;
  // console.log(userId);
  const resPonse = await cartModel.findOne({ user: userId });
  if (resPonse) {
    res.status(200).json(resPonse?.cartItems.length);
  } else res.status(200).json(0);
});

module.exports = {
  login,
  register,
  logout,
  addCart,
  removeCart,
  decreaseCartQty,
  addCartQty,
  getUserCart,
  getCartNumber,
};
