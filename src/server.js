import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/blogDB')
    .then(() => {app.listen(port)})
    .then(()=> {console.log(`Succes Terkoneksi ke port ${port}`)})
    .catch((err)=>{console.log(err)})

