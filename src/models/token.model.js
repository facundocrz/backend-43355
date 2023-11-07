import mongoose from "mongoose";

const tokenCollection = "tokens";

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const tokenModel = mongoose.model(tokenCollection, tokenSchema);

export default tokenModel;
