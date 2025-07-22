import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    id : {
        type:Number,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required:true,
        unique:true
    },
});

const Group = mongoose.model("group", groupSchema);
export default Group;
