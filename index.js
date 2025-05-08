import 'dotenv/config'
import express from 'express';
import paymentRoutes from './route/paymentRoute.js';


const app = express();

app.use(express.json())



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', paymentRoutes)


app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000/')
})