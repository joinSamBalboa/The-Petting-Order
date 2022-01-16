import User from '../models/user'

// GET /profile
export const getProfile = async (req: { currentUser: { _id: string } }, res: any) => {
  try {
    const user = await User.findById(req.currentUser._id).populate('pets').populate('petDates').populate('requests')
    if (!user) throw new Error('User not found')
    return res.status(200).json(user)
  } catch (error) {
    console.log('Could not get user profile')
    console.log(error.message)
    return res.status(404).json({ message: error.message })
  }
}

// PUT /profile/edit
export const editProfile = async (req: { currentUser: { _id: string }; body: any }, res: any) => {
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('User not found')
    await user.updateOne(req.body)
    return res.status(202).json(user)
  } catch (error) {
    console.log('User not updated')
    console.log(error)
    return res.status(404).json(error)
  }
}

// DELETE /profile
export const deleteProfile = async (req: { currentUser: { _id: string } }, res: any) => {
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('User not found')
    await user.deleteOne()
    return res.sendStatus(204)
  } catch (error) {
    console.log('User not found')
    console.log(error)
    return res.status(404).json(error)
  }
}


// GET /profile/:id
export const getUserProfile = async (req: { params: { id: string } }, res: any) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('pets')
    if (!user) throw new Error('User not found')
    return res.status(200).json(user)
  } catch (error) {
    console.log('Could not get user profile')
    console.log(error.message)
    return res.status(404).json({ message: error.message })
  }
}

// POST /profile/:id/review
export const addReview = async (req: { params: { id: string }; body: any; currentUser: { _id: string } }, res: any) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) throw new Error()
    const newReview = { ...req.body, owner: req.currentUser._id }
    user.reviews.push(newReview)
    await user.save()
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}


// DELETE /profile/:id/review/:id
export const deleteReview = async (req: { params: { id: string; reviewId: string }; currentUser: { _id: string } }, res: any) => {
  const { id, reviewId } = req.params
  try {
    const user = await User.findById(id)
    if (!user) throw new Error()
    const reviewToDelete = user.reviews.id(reviewId)
    if (!reviewToDelete) throw new Error('Review not found')
    if (!reviewToDelete.owner.equals(req.currentUser._id) && (!user.owner.equals(req.currentUser._id))) throw new Error('Unauthorised')
    await reviewToDelete.remove()
    await user.save()
    return res.status(202).json(user)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}
