const mongoose = require('mongoose');

function connectToDB () {
    mongoose.connect(process.env.MONGODB_URI
    ).then(() =>{
        console.log('Connected to Mongo database Successfully');
    }).catch(err => console.log(err));
}
    

module.exports = connectToDB;