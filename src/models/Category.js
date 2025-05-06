import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Category2 || mongoose.model("Category2", categorySchema);