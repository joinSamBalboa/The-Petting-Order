import express from 'express'
import { loginUser, registerUser } from '../controllers/auth'
import { addFeedback, createPet, deleteFeedback, deletePet, editFeedback, editPet, getAllPets, getSinglePet } from '../controllers/pets'
import { addReview, deleteReview, editProfile, editReview, getProfile, getUserProfile } from '../controllers/users'
import { secureRoute } from './secureRoute'

const router = express.Router()

router.route('/pets')
  .get(getAllPets) // Tested

router.route('/pet')
  .post(secureRoute, createPet) // Tested

router.route('/pet/:id')
  .get(getSinglePet) // Tested
  .put(editPet) // Tested
  .delete(secureRoute, deletePet) // Tested

router.route('/pet/:id/feedback')
  .post(secureRoute, addFeedback) // Tested

router.route('/pet/:id/feedback/:id')
  .put(secureRoute, editFeedback)
  .delete(secureRoute, deleteFeedback)

router.route('/register') 
  .post(registerUser) // Tested

router.route('/login')
  .post(loginUser)

router.route('/profile')
  .get(secureRoute, getProfile)
  .delete(secureRoute, editProfile)

router.route('/profile/edit')
  .put(secureRoute, editProfile)

router.route('/profile/:id')
  .get(secureRoute, getUserProfile)

router.route('/profile/:id/review')
  .post(secureRoute, addReview)

router.route('/profile/:id/review/:id')
  .put(secureRoute, editReview)
  .delete(secureRoute, deleteReview)



export default router