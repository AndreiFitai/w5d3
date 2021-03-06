const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new Schema({
    index: {
        type: Number,
        required: true,
        unique: true,
    },
    title: { type: String, required: true },
    calories: { type: Number, required: true },
    type: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        required: true,
    },
    cuisine: {
        type: String,
        enum: ['french', 'italian', 'spanish', 'asian', 'american', 'german', 'international'],
        required: true,
    },
})

module.exports = mongoose.model('Food', foodSchema)
