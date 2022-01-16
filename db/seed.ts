import mongoose from 'mongoose'
import 'dotenv/config'

// Models
import User from '../models/user'
import Pet from '../models/pet'
import Request from '../models/request'
import PetDate from '../models/petDate'

// Data
import userData from './data/users'
import petData from './data/petDates'
import requestData from './data/requests'
import petDateData from './data/petDates'

// Seed Database
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.dbURI)
    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()
    console.log('Dropped database')

    // Create users
    const users = await User.create(userData)
    console.log(`Database seeded with ${users.length} users`)

    // Create pets
    const pets = await Pet.create(petData)
    console.log(`Database seeded with ${pets.length} pets`)
    
    // Create requests
    const requests = await Request.create(requestData)
    console.log(`Database seeded with ${requests.length} requests`)
    
    // Create petDates
    const petDates = await PetDate.create(petDateData)
    console.log(`Database seeded with ${petDates.length} pet dates`)

  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
    await mongoose.connection.close()
    console.log('Bye')
  }
}

seedDatabase()