import connectDB from '../../../mongoose.config';
import Task from '../models/Task';

connectDB();

export { Task };
