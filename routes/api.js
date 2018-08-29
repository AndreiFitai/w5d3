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

router.delete('/food/:index', (req, res) => {
    Food.findOneAndRemove({ index: req.params.index }).then(() => {
        res.send({ success: true })
    })
})

router.patch('/food/:index', (req, res) => {
    Food.findOneAndUpdate({ index: req.params.index }, req.body, { new: true }).then(updatedFood => {
        res.send(updatedFood)
    })
})

router.get('/food', (req, res) => {
    Food.find({}).then(foods => {
        res.send(foods)
    })
})

router.get('/food/:index', (req, res) => {
    Food.findOne({ index: req.params.index }).then(food => {
        if (food) return res.send(food)
        else res.send({ err: 404 })
    })
})

router.put('/food/:index', (req, res) => {
    const { title, cuisine, calories, type } = req.body

    if (!title || !cuisine || !calories || !type) {
        return res.status(400).send({ error: 'Please provide all required fields.' })
    }

    const { index } = req.params

    Food.findOne({ index })
        .then(currentFood => {
            if (currentFood) {
                return Food.findOneAndUpdate(
                    { index },
                    { title, cuisine, calories, type },
                    { new: true }
                )
            } else {
                return new Food({ title, cuisine, calories, type, index }).save()
            }
        })
        .then(newFood => {
            res.send(newFood)
        })
})

module.exports = router
