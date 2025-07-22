import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique:true
    },
    image: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
