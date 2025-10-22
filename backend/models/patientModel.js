const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const patientSchema = new mongoose.Schema(
  {
    Sex: {
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
    age: {
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

patientSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: 3600,
  });
  return token;
};

const patient = mongoose.model("patient", patientSchema);
