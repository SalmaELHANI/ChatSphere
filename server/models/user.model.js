import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  pseudonyme: { 
    type: String, 
    unique: true, 
    required: true 
},
});

const User = mongoose.model('User', userSchema);

export default User;
