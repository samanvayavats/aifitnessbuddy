import mongoose, { model } from "mongoose";

const contactSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    message :{
        type : String,
        required : true
    },
} ,{timestamps : true})

export const Contact = mongoose.models.Contact || mongoose.model("Contact" , contactSchema)