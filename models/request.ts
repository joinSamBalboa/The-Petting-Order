import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pets: { type: String, required: true },
  type: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  accepted: { type: Boolean, required: true}
}, {
  timestamps: true
})

export default mongoose.model('Request', requestSchema)