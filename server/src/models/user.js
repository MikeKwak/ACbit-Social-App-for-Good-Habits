import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
    imgURL: {
        type: String,
        default: null,
    },
    groups: {
        type: [
            {
                _id: mongoose.Types.ObjectId,
                groupID: String,
                name: String,
            },
        ],
        default: [],
    },
    taskData: {
        type: [
            {
                date: Date,
                tasksCompleted: Number,
            }
        ],
        default: [],
    }
});

UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
};

UserSchema.methods.addGroup = function (group) {
    this.groups.push(group);
};

// UserSchema.methods.uploadImage = function (imgURL) {
//     console.log(imgURL)
//     this.updateOne({"imgURL": imgURL})
// };

UserSchema.methods.leaveGroup = async function (id) {
    this.groups = this.groups.filter((group) => group.groupID !== id);
    await this.save();
};

const User = mongoose.model('User', UserSchema);
export default User;
