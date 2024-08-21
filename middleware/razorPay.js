const Razorpay = require("razorpay");

// const paymentGetway = async (res, req) => {
//     let { ammount } = req.body

//     var instance = new Razorpay({ key_id: 'rzp_test_Od4e81QqOCRUOp', key_secret: 'EGssavEJQT1mnx1szEZion2b' })
//     let order = await instance.orders.create({
//         amount: ammount * 100,
//         currency: "INR",
//         receipt: "receipt#1",
//     })

//     try {
//         const order = await razorpay.orders.create(options);
//         res.json(order);
//     } catch (error) {
//         res.status(500).send(error);
//     }

//     res.status(201).json({
//         success: true,
//         order,
//         ammount
//     })
// }

const razorpay = new Razorpay({
    key_id: 'rzp_test_Od4e81QqOCRUOp',
    key_secret: 'EGssavEJQT1mnx1szEZion2b'
});

let paymentGetway = async (req, res) => {
    const options = {
        amount: 500, // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = paymentGetway