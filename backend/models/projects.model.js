import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    date: { type: Date, default: new Date() },

    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

},
    { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema)
export default Project
