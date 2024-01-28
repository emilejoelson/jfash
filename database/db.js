//Mongodb compass
const mongoose = require('mongoose')
const url="mongodb://127.0.0.1:27017/Fiti";

mongoose.set('strictQuery', false)

const db = () => {
    return mongoose.connect(url,
        { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports=db;