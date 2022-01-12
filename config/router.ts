import express from 'express'
import { getAllPets } from '../controllers/pets'

const router = express.Router()

router.route('/pets')
  .get(getAllPets)

export default router