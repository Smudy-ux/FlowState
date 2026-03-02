import mongoose from "mongoose";

const coopTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    countOfUsersRequired: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['not done', 'in work', 'done'],
        default: 'not done'
    },
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

export default mongoose.model('CoopTask', coopTaskSchema);