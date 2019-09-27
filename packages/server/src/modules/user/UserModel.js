var mongoose = require("mongoose");
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      hidden: true
    },
    email: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {
      createdAt: "createdAt"
    }
  }
);

UserSchema.pre("save", function encryptPasswordHook(next) {
  // Hash the password
  if (this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password) {
    return bcrypt.hashSync(password, 8);
  }
};

module.exports = mongoose.model("User", UserSchema);
