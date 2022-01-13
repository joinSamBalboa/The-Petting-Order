import Request from '../models/request'

// POST /request
export const createRequest = async (req: any, res: any) => {
  try {
    const newRequest = await Request.create(req.body)
    res.status(201).json(newRequest)
  } catch (error) {
    console.log('🆘 Did not create request')
    console.log(error)
    return res.status(422).json(error)
  }
}

// GET /request/:id
// Returning single request based on id, from request database
export const getSingleRequest = async (req: { params: { id: string } }, res: any) => {
  try {
    const { id } = req.params
    const requestToDisplay = await Request.findById(id)
    console.log(requestToDisplay)
    return res.status(200).json(requestToDisplay)
  } catch (error) {
    console.log('🆘 Error finding request') 
    console.log(error)
    return res.status(404).json({ message: 'Request not found', errors: error })
  }
}

// PUT /request/:id
// editing single request based on id, from request database
export const editRequest = async (req: { params: { id: string }, body: any }, res: any) => {
  const { id } = req.params
  try {
    const requestToEdit = await Request.findById(id)
    if (!requestToEdit) throw new Error()
    await requestToEdit.updateOne(req.body)
    return res.status(202).json(requestToEdit)
  } catch (error) {
    console.log('🆘 Request not edited') 
    console.log(error)
    return res.status(404).json({ message: 'Request not found', errors: error })
  }
}

// DELETE /request/:id
// delete single request based on id, from request database
export const deleteRequest = async (req: { params: { id: string }, body: any }, res: any) => {
  const { id } = req.params
  try {
    const requestToDelete = await Request.findById(id)
    if (!requestToDelete) throw new Error('Request not found')
    await requestToDelete.deleteOne()
    return res.sendStatus(204)
  } catch (error) {
    console.log('🆘 Request not found')
    console.log(error)
    return res.status(404).json(error)
  }
}

