import express from 'express'
import path from 'path';
const __dirname = path.resolve();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';



const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

import postRouter from './api/routes/posts.mjs';
import authRouter from './api/routes/auth.mjs';


app.use('/api', authRouter)



app.use(`/api`, (req, res, next) => {
    console.log("cookies; ", req.cookies)

    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        console.log("decoded: ", decoded);


        req.body.decoded = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };
        next();

    } catch (error) {

        res.status(401).send({
            message: "Invalid token"
        });
    }

})




app.use('/api', postRouter);


app.use(``, express.static(path.join(__dirname, './frontend/build')))
app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`posting app listening on ${PORT} `)
})