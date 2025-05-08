import express from 'express'
import { checkout, paymentVarified, verifyPayment } from '../controllers/PaymentControler.js'

const paymentRoutes = express.Router()


paymentRoutes.get('/', (req, res) => {
    res.send('hello world')
})

paymentRoutes.post('/checkout', checkout)
paymentRoutes.post('/payment-verification', verifyPayment)
paymentRoutes.get('/paymentVerified', paymentVarified )

export default paymentRoutes