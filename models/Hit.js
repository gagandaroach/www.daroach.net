import mongoose from 'mongoose'

const HitSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    route: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Hit || mongoose.model('Hits', HitSchema);
