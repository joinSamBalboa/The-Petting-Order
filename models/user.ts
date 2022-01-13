import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

const reviewSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true }
}, {
  timestamps: true
})

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 20 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  phoneNumber: { type: Number, required: true, unique: true },
  postCode: { type: String, required: true },
  reviews: [reviewSchema]
})

// Virtual Fields

userSchema
  .virtual('passwordConfirmation')
  .set(function(this: any, passwordConfirmation: string){
    this._passwordConfirmation = passwordConfirmation
  })


// Virtual field of pets added
userSchema.virtual('pets', {
  ref: 'Pet',
  localField: '_id',
  foreignField: 'owner'
})

// Virtual field of petDates
userSchema.virtual('petDates', {
  ref: 'PetDate',
  localField: '_id',
  foreignField: 'owner'
})

// Virtual field of requests
userSchema.virtual('requests', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'owner'
})


// Remove password
userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json){
    delete json.password
    return json
  }
})

// Custom pre-validation
userSchema
  .pre('validate', function(this: any, next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation){
      this.invalidate('passwordConfirmation', 'Passwords don\'t match')
    }
    next()
  })

// Custom pre-save
userSchema
  .pre('save', function(this: any, next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// Save
userSchema.methods.validatePassword = function(password: string){
  return bcrypt.compareSync(password, this.password)
}


userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)