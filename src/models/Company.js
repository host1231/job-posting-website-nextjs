import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        amountWorker: {
            type: Number,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

export default mongoose.models.Company || mongoose.model("Company", companySchema);