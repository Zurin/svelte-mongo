import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date, default: Date.now
    }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
