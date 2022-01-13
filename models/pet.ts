import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responsive: { type: Number, min: 1, max: 5 },
  childFriendly: { type: Number, min: 1, max: 5 },
  dogFriendly: { type: Number, min: 1, max: 5 },
  playful: { type: Number, min: 1, max: 5 },
  sensitive: { type: Number, min: 1, max: 5 },
  petDate: { type: mongoose.Schema.Types.ObjectId, ref: 'petDate' }
}, {
  timestamps: true
})

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  species: { type: String, required: true },
  vaccinated: { type: Boolean, required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  feedbacks: [feedbackSchema]
})


petSchema.virtual('averageResponsive')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.feedbacks.reduce((acc: number, feedback: any) => {
      return acc + feedback.responsive
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.virtual('averageChildFriendly')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.feedbacks.reduce((acc: number, feedback: any) => {
      return acc + feedback.childFriendly
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.virtual('averageDogFriendly')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.feedbacks.reduce((acc: number, feedback: any) => {
      return acc + feedback.dogFriendly
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.virtual('averagePlayful')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.feedbacks.reduce((acc: number, feedback: any) => {
      return acc + feedback.playful
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.virtual('averageSensitive')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.feedbacks.reduce((acc: number, feedback: any) => {
      return acc + feedback.sensitive
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Pet', petSchema)