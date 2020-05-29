import express from 'express'
const router = express.Router()

import tunrController from '../controllers/turnController'
    
    // Agrega nuevo turno via POST
    router.post('/turn',
        tunrController.newTurn
    )

    // Obtener todos los turnos
    router.get('/turn', 
        tunrController.showTurns
    )

    // Muestra un turno en especifico (ID)
    router.get('/turn/:id', 
        tunrController.showTurn 
    )

    // Actualizar Turno
    router.put('/turn/:id', 
        tunrController.updateTurn
    )

    // Eliminar turno
    router.delete('/turn/:id', 
        tunrController.deleteTurn
    )

export default router

