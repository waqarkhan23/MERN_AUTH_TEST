import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    carModel: {
      type: String,
      required: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    totalImages: {
      type: Number,
    },
    images: [String],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
