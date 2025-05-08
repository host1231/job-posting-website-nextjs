import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
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

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
