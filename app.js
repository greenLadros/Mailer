//init
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const app = express()

//View engine setup
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

//Setting Middlewares
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())


//Routes
app.get('/', (req, res) => {
    res.render('contact', { layout: false })
})

app.post('/', async (req, res) => {
    console.log('1')
    const output = `
    <p>costumer has tried to reach you</p>
    <h3>Costumer details:</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'fill in yours',
            pass: 'fill in yours'
        }
    })
    console.log("2")

    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '', // sender address
            to: "", // list of receivers
            subject: "Node Contact Request", // Subject line
            text: "Hello world?", // plain text body
            html: output // html body
        })

        console.log("info=", info)

        res.render('contact', { msg: 'Email has been sent' })

    } catch(err) {
        console.error(err)
    }
    
})

//defining functions

//start listening to the server
app.listen('3000', () => {
    console.log("server started...")
})
