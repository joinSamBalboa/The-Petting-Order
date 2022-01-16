import express from 'express'
import { loginUser, registerUser } from '../controllers/auth'
import { createPetDate, deletePetDate, editPetDate, getSinglePetDate } from '../controllers/petDates'
import { addFeedback, createPet, deleteFeedback, deletePet, editPet, getAllPets, getSinglePet } from '../controllers/pets'
import { createRequest, deleteRequest, editRequest, getSingleRequest } from '../controllers/requests'
import { addReview, deleteProfile, deleteReview, editProfile, getProfile, getUserProfile } from '../controllers/users'
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
  .get(secureRoute, getProfile) // Tested
  .delete(secureRoute, deleteProfile) // Tested
  .put(secureRoute, editProfile) // Tested
  
router.route('/profile/:id')
  .get(secureRoute, getUserProfile) // Tested

router.route('/profile/:id/review')
  .post(secureRoute, addReview) // Tested

router.route('/profile/:id/review/:reviewId')
  .delete(secureRoute, deleteReview) // Tested

router.route('/request')
  .post(secureRoute, createRequest) // Tested

router.route('/request/:id')
  .get(secureRoute, getSingleRequest) // Tested
  .put(secureRoute, editRequest) // Tested
  .delete(secureRoute, deleteRequest) // Tested

router.route('/petdate')
  .post(secureRoute, createPetDate) // Tested

router.route('/petdate/:id')
.get(secureRoute, getSinglePetDate) // Tested
.put(secureRoute, editPetDate) // Tested
.delete(secureRoute, deletePetDate) // Tested



export default router