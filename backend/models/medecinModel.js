const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const medecinSchema = new mongoose.Schema(
  {
    sex: {
      type: String,
      required: true,
    },
    First_Name: {
      type: String,
      required: true,
    },
    Last_Name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
  },
  { timestamps: true }
);

medecinSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: 3600,
  });
  return token;
};

const Medecin = mongoose.model("medecin", medecinSchema);

module.exports = { Medecin };
