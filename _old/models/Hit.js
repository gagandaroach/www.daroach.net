import mongoose from 'mongoose'

const HitSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    port: {
        type: String,
    },
    path: {
        type: String,
    },
    params: {
        type: String
    },
    method: {
        type: String,
    },
    userAgent: {
        type: String,
    },
    protocol: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Hit || mongoose.model('Hit', HitSchema);
