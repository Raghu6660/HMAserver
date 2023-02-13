import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from "bcrypt";


const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
      },
      lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
      },
      email: {
        type: String,
        required: [true, 'please enter an email'],
        max: 50,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
      },
      password: {
        type: String,
        required: [true, 'please enter an password'],
        minLength: [6, 'Minimum password length is 6 characters']
      },
      picturePath: {
        data: Buffer,
        contentType: String,
        default:""
      }
});

adminSchema.pre('save',async function(next){ //this method invokes before entering into the the db
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  next();
});

adminSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

export const adminModel = new mongoose.model("admin", adminSchema);