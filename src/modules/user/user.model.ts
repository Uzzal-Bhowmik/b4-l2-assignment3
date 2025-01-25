import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  const userPassword = this.password;
  const saltRounds = Number(config.bcrypt_salt_rounds);

  this.password = await bcrypt.hash(userPassword, saltRounds);

  next();
});

// Hide password field to client after saving
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Exclude users with isDeleted to true
userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const User = model<TUser>("User", userSchema);
