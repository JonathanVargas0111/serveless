const express = require('express')
const Order = require('../models/Orders')
const {isAuthenticated, hasRoles}  = require('../auth')

const router = express.Router()
//Listar 
router.get('/',(req, res)=>{    
    Order.find()
    .exec()
    .then(x=>res.status(200).send(x))    
})
//Busca por medio de id
router.get('/:id', (req, res)=>{
    Order.findById(req.params.id)   
    .exec()
    .then(x => res.status(200).send(x))
})

//Ruta para crear
router.post('/',isAuthenticated, (req, res) =>{
    const {_id} = req.user
    Order.create({ ...req.body, user_id : _id}).
        then(x=> res.status(201).send(x))
    
})

// Ruta para editar
router.put('/:id',isAuthenticated,hasRoles(['admin', 'user']), (req, res)=>{
    Order.findByIdAndUpdate(req.params.id, req.body)
        .then(()=>res.sendStatus(204))
})

//Eliminar un elemento
router.delete('/:id',isAuthenticated, (req, res)=>{
    Order.findByIdAndDelete(req.params.id).exec().then(()=>res.sendStatus(204))
})
module.exports = router