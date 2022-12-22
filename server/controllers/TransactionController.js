import Transaction from "../models/Transaction.js";

export const fetchTransaction = async (req, res) => {
  const transaction = await Transaction.find({ user_id: req.user._id }).sort({
    createdAt: -1,
  });
  res.json({ data: transaction });
};

export const createTransaction = async (req, res) => {
  const { amount, description, date, category_id } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
    user_id: req.user._id,
    category_id,
  });
  await transaction.save();
  res.json({ message: "success" });
};

export const deleteTransaction = async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ message: "deleted successful" });
};

export const updateTransaction = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "updated successful" });
};
