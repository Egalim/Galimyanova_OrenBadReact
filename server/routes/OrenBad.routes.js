import { Router } from 'express'
import { OrenBadController } from '../controllers/OrenBad.controller.js'

export const router = new Router()

router.get('/category', OrenBadController.getCategory)
router.get('/pharmacy', OrenBadController.getPharmacy)
