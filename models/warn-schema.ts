import mongoose, { Schema } from 'mongoose'

const reqString = {
    type: String,
    required: true,
}

const schema = new Schema(
    {
        userId: String,
        guildId: String,
        reason: String,
        staffId: String,
    },
    {
        timestamps: true,
    }
)

const name = 'warns'

export default mongoose.models[name] || mongoose.model(name, schema)
