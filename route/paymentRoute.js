import express from 'express'
import { checkout, verifyPayment } from '../controllers/PaymentControler.js'

const paymentRoutes = express.Router()


paymentRoutes.get('/', (req, res) => {
    res.send('hello world')
})

paymentRoutes.post('/checkout', checkout)
paymentRoutes.post('/payment-verification', verifyPayment)

export default paymentRoutes