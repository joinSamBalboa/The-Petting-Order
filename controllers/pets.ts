import Pet from '../models/pet'

// Get /pets
export const getAllPets = async (_req: any, res: any) => {
  const pets = await Pet.find() // Get all pets in database
  console.log(pets)
  return res.status(200).json(pets)
}

// POST /pet
// Create a new pet
export const createPet = async (req: any, res: any) => {
  try {
    const petToAdd = await Pet.create(req.body)
    res.status(201).json(petToAdd)
  } catch (err) {
    console.log('🆘 Did not add pet')
    console.log(err)
    return res.status(422).json(err)
  }
}

// GET /pet/:id
// Returning single pet based on id, from pet database
export const getSinglePet = async (req: { params: { id: string } }, res: any) => {
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

// PUT /pet/:id
export const editPet = async (req: { params: { id: string }, body: any }, res: any) => {
  const { id } = req.params
  try {
    const petToEdit = await Pet.findById(id)
    if (!petToEdit) throw new Error()
    await petToEdit.updateOne(req.body)
    return res.status(202).json(petToEdit)
  } catch (error) {
    console.log('Pet not edited')
    console.log(error)
    return res.status(404).json(error)
  }
}

// DELETE /pet/:id
export const deletePet = async (req: { params: { id: any } }, res: any) => {
  const { id } = req.params
  try {
    const petToDelete = await Pet.findById(id)
    if (!petToDelete) throw new Error('Pet not found')
    await petToDelete.deleteOne()
    return res.sendStatus(204)
  } catch (error) {
    console.log('Pet not found')
    console.log(error)
    return res.status(404).json(error)
  }
}

// POST /pet/:id/feedback
export const addFeedback = async (req: { params: { id: string }; body: any; currentUser: { _id: string } }, res: any) => {
  const { id } = req.params
  try {
    const pet = await Pet.findById(id)
    if (!pet) throw new Error()
    const newFeedback = { ...req.body, owner: req.currentUser._id }
    pet.feedbacks.push(newFeedback)
    await pet.save()
    return res.status(200).json(pet)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}

// PUT /pet/:id/feedback/:id
export const editFeedback = async (req: { params: { id: string; feedbackId: string }; currentUser: { _id: string }; body: any }, res: any) => {
  const { id, feedbackId } = req.params
  try {
    const pet = await Pet.findById(id)
    if (!pet) throw new Error()
    const feedbackToEdit = pet.feedbacks.id(feedbackId)
    if (!feedbackToEdit) throw new Error('Feedback not found')
    if (!feedbackToEdit.owner.equals(req.currentUser._id) && (!pet.owner.equals(req.currentUser._id))) throw new Error('Unauthorised')
    await feedbackToEdit.updateOne(req.body)
    await pet.save()
    return res.status(202).json(pet)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}

// DELETE /pet/:id/feedback/:id
export const deleteFeedback = async (req: { params: { id: string; feedbackId: string }; currentUser: { _id: string } }, res: any) => {
  const { id, feedbackId } = req.params
  try {
    const pet = await Pet.findById(id)
    if (!pet) throw new Error()
    const feedbackToDelete = pet.feedbacks.id(feedbackId)
    if (!feedbackToDelete) throw new Error('Feedback not found')
    if (!feedbackToDelete.owner.equals(req.currentUser._id) && (!pet.owner.equals(req.currentUser._id))) throw new Error('Unauthorised')
    await feedbackToDelete.deleteOne()
    await pet.save()
    return res.status(202).json(pet)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}

