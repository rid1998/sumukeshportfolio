const mongoose = require('mongoose')


const userFeedbackSchema = new mongoose.Schema({

    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    websiteFeedback: {
        type: Boolean
    },
    comment: {
        type: String
    }
})

module.exports = mongoose.model('UserFeedback',userFeedbackSchema)