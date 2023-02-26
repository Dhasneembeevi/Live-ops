const express = require('express')
const app = express();
const cors = require('cors') // sets correct headers to communicate with cross origins
const UserLogin = require('./models/userlogin');
const Post = require('./models/post')
const register = require('./models/registerUser')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path')
const fileUpload = require('express-fileupload');
const date = new Date();

app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://Dhasneem:Dhasneem@cluster0.nsaxkcu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("connected to mongodb successfully..")
    })
    .catch(() => {
        console.log("error in connecting mongo")
    })

app.get('/', async (req, res) => {
    res.status(201).json({
        result: await Post.find()
    })
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const { username, email, password, age } = req.body;
        let userCredentials = await register.findOne({ email: email })

        if (userCredentials !== null) {
            res.status(404).json({
                status: "failure",
                message: "user already exists"
            })
        }
        else {
            let createUser = await register.create({
                username: username,
                email: email,
                password: password,
                age: age,
            })
            res.status(201).json({
                status: "success",
                message: "User created successfully..",
                data: createUser
            })
        }
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: "error- duplicate mail Id"
        })
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body)

    try {
        const { email, password } = req.body
        const user = await register.findOne({
            email: email
        })
        if (user == null) {
            res.status(404).json({
                status: "failure",
                message: "user doesn't exists"
            })
        }
        else {
            if (password == user.password) {
                res.status(201).json({
                    status: "success",
                    message: "User logged successfully.."
                })
            }
            else {
                res.status(404).json({
                    status: "failed",
                    message: "Incorrect Password"
                })
            }
        }
    }
    catch (error) {
        res.status(400).json({
            status: "failed to login"
        })
    }
})

app.post('/post', async (req, res) => {
    const { offer_id, offer_title, offer_description, Date } = req.body;
    const { offer_image } = req.files
    // console.log(req.body);
    // console.log(req.files)
    offer_image.mv('./public/' + offer_image.name, async (err) => {
        if (err) {
            res.status(400).json({
                message: err
            })
        }
        else {
            try {

                const postData = await Post.create({
                    offer_id: offer_id,
                    offer_title: offer_title,
                    offer_description: offer_description,
                    offer_image: offer_image.name,
                })
                console.log("data added successfully..")
                res.status(201).json({
                    status: "success",
                    message: "Posted successfully..",
                    postData
                })
            } 
            catch (error) {
                res.status(401).json({
                    message: "something went wrong",
                    response: err
                })
            }
        }
    })
})

app.get('/images/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, `./public/${req.params.filename}`))
})

const port = 5000;
app.listen(port, () => {
    console.log(`server listening to ${port}`)
})