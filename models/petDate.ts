import mongoose from 'mongoose'

const petDateSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
  approved: { type: Boolean, required: true}
}, {
  timestamps: true
})

export default mongoose.model('PetDate', petDateSchema)