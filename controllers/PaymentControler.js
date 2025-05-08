
import Razorpay from 'razorpay';
import crypto from 'crypto'
import paymentModel from '../model/paymentModel.js';


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkout = async (req, res) => {

    try {
        const { name, amount } = req.body
        // console.log(name,amount)

        const order = await razorpay.orders.create(
            {
                amount: Number(amount),
                currency: "INR"
            }
        )

        await paymentModel.create({
            order_id: order.id,
            name: name,
            amount: amount,
        })


        console.log({ order })
        res.json({ order })

    } catch (error) {
        console.log("error in checkout api::", error)
    }
}


const verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body_data = razorpay_order_id + '|' + razorpay_payment_id;

    const expect = crypto.createHmac('sha256', 'l946KF9kpEW2deQS0q625rIP').update(body_data).digest('hex');

    const isValid = expect === razorpay_signature;

    try {
        const updatedDocument = await paymentModel.findOneAndUpdate(
            { order_id: razorpay_order_id },
            {
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
                razorpay_signature: razorpay_signature,
            },
            { new: true }
        );

        console.log('Updated Document:', updatedDocument);

        res.redirect('http://127.0.0.1:5500/Ecomm-UI/success.html');

        if (!isValid) {
            console.log('Invalid signature. Payment verification failed.');
            res.redirect('http://localhost:5173/failed');
        }

    } catch (error) {
        console.error('Error updating document:', error);
        res.redirect('http://localhost:5173/failed');
    }
}

const paymentVarified = async (req, res) => {
    try {
        res.send('payment varified')
    } catch (error) {
        console.log("error in payment varified", error)

    }
}

export { checkout, verifyPayment, paymentVarified };