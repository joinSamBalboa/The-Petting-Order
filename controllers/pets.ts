import Pet from '../models/pet'

// Get /pets
export const getAllPets = async (_req, res) => {
  const pets = await Pet.find() // Get all pets in database
  console.log(pets)
  return res.status(200).json(pets)
}

// POST /pets
// Create a new pet
export const createPet = async (req, res) => {
  try {
    const petToAdd = await Pet.create(req.body)
    res.status(201).json(petToAdd)
  } catch (err) {
    console.log('🆘 Did not add pet')
    console.log(err)
    return res.status(422).json(err)
  }
}

// GET /pets/:id
// Returning single pet based on id, from pet database
export const getSinglePet = async (req, res) => {
  try {
    const { id } = req.params
    const petToDisplay = await Pet.findById(id)
    console.log(petToDisplay)
    return res.status(200).json(petToDisplay)
  } catch (err) {
    console.log('🆘 Error finding pet') 
    console.log(err)
    return res.status(404).json({ message: 'Pet not found', errors: err })
  }
}