import PetDate from '../models/petDate'

// POST /petDate
export const createPetDate = async (req: any, res: any) => {
  try {
    const newPetDate = await PetDate.create(req.body)
    res.status(201).json(newPetDate)
  } catch (error) {
    console.log('🆘 Did not create pet date')
    console.log(error)
    return res.status(422).json(error)
  }
}

// GET /petDate/:id
// Returning single petDate based on id, from petDate database
export const getSinglePetDate = async (req: { params: { id: string } }, res: any) => {
  try {
    const { id } = req.params
    const petDateToDisplay = await PetDate.findById(id)
    console.log(petDateToDisplay)
    return res.status(200).json(petDateToDisplay)
  } catch (error) {
    console.log('🆘 Error finding pet date') 
    console.log(error)
    return res.status(404).json({ message: 'pet date not found', errors: error })
  }
}

// PUT /petDate/:id
// editing single petDate based on id, from petDate database
export const editPetDate = async (req: { params: { id: string }, body: any }, res: any) => {
  const { id } = req.params
  try {
    const petDateToEdit = await PetDate.findById(id)
    if (!petDateToEdit) throw new Error()
    await petDateToEdit.updateOne(req.body)
    return res.status(202).json(petDateToEdit)
  } catch (error) {
    console.log('🆘 pet date not edited') 
    console.log(error)
    return res.status(404).json({ message: 'pet date not found', errors: error })
  }
}

// DELETE /petDate/:id
// delete single petDate based on id, from petDate database
export const deletePetDate = async (req: { params: { id: string }, body: any }, res: any) => {
  const { id } = req.params
  try {
    const petDateToDelete = await PetDate.findById(id)
    if (!petDateToDelete) throw new Error('pet date not found')
    await petDateToDelete.deleteOne()
    return res.sendStatus(204)
  } catch (error) {
    console.log('🆘 pet date not found')
    console.log(error)
    return res.status(404).json(error)
  }
}