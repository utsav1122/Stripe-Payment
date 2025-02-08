const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51QMtqf08o9ppX59KID4WJoKw1d3CZbQst3ELtYuHKOpjXi3JuWtXn1F3p0KMA0Tg3y3THfxcPoE7gXfs0S3qboPL00kmvZonOL");
const { v4: uuidv4 } = require("uuid");



const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res) => {
    res.send('It works'); 
})

app.post("/payment",(req,res) => {
    const {product,token} = req.body;
    console.log("PRODUCT",product);
    console.log("PRICE",product.price);
    const idempotencyKey = uuidv4();
    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer => {
        stripe.charges.create({
            amount:product.price * 100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:product.name,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        },{idempotencyKey})  
    })
    .then(result => res.status(200).json(result))
    .catch(err => {
        console.log(err);
});

app.listen(8282, () => console.log("Server is running on port 8282"));

});