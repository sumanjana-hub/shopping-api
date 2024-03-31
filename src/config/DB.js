const mongoose = require('mongoose');

const connectdb = () => {
    mongoose.connect('mongodb://localhost:27017/shopping-api', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectdb;
