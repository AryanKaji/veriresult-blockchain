import mongoose, { Schema } from "mongoose";

const CounterSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Number,
        default: 0,
    },
});

const CounterModel = mongoose.models.Counter ||
    mongoose.model("Counter", CounterSchema);

export default CounterModel;
