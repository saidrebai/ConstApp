const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ref } = require("process");

const consultationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "patient",
      required: true
    },
    medcinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "medecin",
      required: true
    },
    date: {
      type: Date,
      required: true,
    },
    Notes: {
      type: String,
    }
  },
  { timestamps: true }
);


const consultation = mongoose.model("consultation", consultationSchema);
