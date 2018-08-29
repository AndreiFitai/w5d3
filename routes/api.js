const express = require('express')
const router = express.Router()

const Food = require('../models/Food')

// create a new food
router.post('/food', (req, res) => {
    const { title, cuisine, calories, type } = req.body

    if (!title || !cuisine || !calories || !type) {
        return res.status(400).send({ error: 'Please provide all required fields.' })
    }

    let index = 1

    Food.findOne({})
        .sort({ index: -1 })
        .then(highestFood => {
            if (highestFood) index = highestFood.index + 1

            return new Food({ title, cuisine, calories, type, index }).save()
        })
        .then(newFood => {
            res.send(newFood)
        })
})

module.exports = router
