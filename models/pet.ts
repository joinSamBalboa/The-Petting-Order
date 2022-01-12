/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
import { ForOfStatement } from 'typescript'

// Schema
const feedbackSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responsive: { type: Number, min: 1, max: 5 },
  childFriendly: { type: Number, min: 1, max: 5 },
  dogFriendly: { type: Number, min: 1, max: 5 },
  playful: { type: Number, min: 1, max: 5 },
  sensitive: { type: Number, min: 1, max: 5 }
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
    const sum = this.responsive.reduce((acc: number, feedback: any) => {
      return acc + feedback.rating
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.virtual('averageChildFriendly')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.childFriendly.reduce((acc: number, feedback: any) => {
      return acc + feedback.rating
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.virtual('averageDogFriendly')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.dogFriendly.reduce((acc: number, feedback: any) => {
      return acc + feedback.rating
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.virtual('averagePlayful')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.playful.reduce((acc: number, feedback: any) => {
      return acc + feedback.rating
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.virtual('averageSensitive')
  .get(function (this: any) {
    if (!this.feedbacks.length) return 'Not yet rated'
    const sum = this.sensitive.reduce((acc: number, feedback: any) => {
      return acc + feedback.rating
    }, 0)
    return Number(sum / this.feedbacks.length).toFixed(2)
  })

petSchema.set('toJSON', { virtuals: true })

// save our schema to a model
export default mongoose.model('Pet', petSchema)