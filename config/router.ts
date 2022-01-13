import express from 'express'
import { loginUser, registerUser } from '../controllers/auth'
import { createPetDate, deletePetDate, editPetDate, getSinglePetDate } from '../controllers/petDates'
import { addFeedback, createPet, deleteFeedback, deletePet, editPet, getAllPets, getSinglePet } from '../controllers/pets'
import { createRequest, deleteRequest, editRequest, getSingleRequest } from '../controllers/requests'
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

router.route('/pet/:id/feedback/:feedbackId')
  .delete(secureRoute, deleteFeedback) // Tested

router.route('/register') 
  .post(registerUser) // Tested

router.route('/login')
  .post(loginUser) // Tested

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

router.route('/request')
  .post(secureRoute, createRequest)

router.route('/request/:id')
  .get(secureRoute, getSingleRequest)
  .put(secureRoute, editRequest)
  .delete(secureRoute, deleteRequest)

router.route('/petDate')
  .post(secureRoute, createPetDate)

router.route('/petDate/:id')
.get(secureRoute, getSinglePetDate)
.put(secureRoute, editPetDate)
.delete(secureRoute, deletePetDate)



export default router