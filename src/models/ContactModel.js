import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    subject: {
        type: String,
      },
    message: { type: String, required: false }, // Reference to User model
    user: { type: String, required: false } // Reference to User model
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
