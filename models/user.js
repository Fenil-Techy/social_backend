import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    post: [{
        type: Schema.Types.ObjectId,
        ref: "Post" 
    }]
});

export const userModel = model("User", userSchema);
