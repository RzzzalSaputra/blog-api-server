import express from 'express'
import mongoose from 'mongoose'

import routesPost from './routes/post.js'

const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))

app.use('/api/v1/blog', routesPost);

app.all('*', (req,res)=>{
    res.status(404).send('Page not found')
})

mongoose.connect('mongodb://localhost:27017/blogDB')
    .then(() => {app.listen(port)})
    .then(()=> {console.log(`Succes Terkoneksi ke port ${port}`)})
    .catch((err)=>{console.log(err)})

