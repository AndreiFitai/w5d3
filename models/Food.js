const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new Schema({
    index: {
        type: String,
        required: true,
        unique: true,
    },
    title: { type: String, required: true },
    calories: { type: Number, default: 500 },
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
