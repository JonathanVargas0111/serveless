const express = require('express')
const Meals = require('../models/Meals')

const router = express.Router()

router.get('/',(req, res)=>{    
    Meals.find()
    .exec()
    .then(x=>res.status(200).send(x))    
})
//Busca por medio de id
router.get('/:id', (req, res)=>{
    Meals.findById(req.params.id)   
    .exec()
    .then(x => res.status(200).send(x))
})

//Ruta para crear
router.post('/', (req, res) =>{
    Meals.create(req.body).
        then(x=> res.status(201).send(x))
    
})

// Ruta para editar
router.put('/:id', (req, res)=>{
    Meals.findByIdAndUpdate(req.params.id, req.body)
        .then(()=>res.sendStatus(204))
})

//Eliminar un elemento
router.delete('/:id',(req, res)=>{
    Meals.findByIdAndDelete(req.params.id).exec().then(()=>res.sendStatus(204))
})

module.exports = router