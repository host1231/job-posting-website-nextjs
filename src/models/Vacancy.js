import mongoose from "mongoose";

const vacancySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true
            }
        ],
        salary: {
            type: String,
            required: false
        },
        type: {
            type: String,
            enum: ["Full-time", "Part-time", "Freelance", "Intern", "Remote", "Temporary"],
            required: true
        },
        experience: {
            type: String,
            enum: ["No experience", "1-3 years", "3-5 years", "5+ years"],
            default: "No experience",
            required: true
        },
        education: {
            type: String,
            enum: ["High", "Partial high", "Medium"],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        requirements: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0,
        }, 
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

export default mongoose.models.Vacancy || mongoose.model("Vacancy", vacancySchema);