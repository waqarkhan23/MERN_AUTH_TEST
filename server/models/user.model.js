import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);
userSchema.methods.comparePassword = function (candidatePassword) {
  const isMatch = candidatePassword === this.password;
  return isMatch;
};
const User = mongoose.model("User", userSchema);

export default User;
