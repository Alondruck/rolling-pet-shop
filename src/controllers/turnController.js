import Turn from '../models/Turn'

// agrega un nuevo turno
const newTurn = async (req, res, next) => {
    const turn = new Turn(req.body)

    try {
        // almacenar el registro
        await turn.save()
        res.json(turn)
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error)
        next()
    }
}

// Muestra todos los turnos
const showTurns = async (req, res, next) => {
    let index = parseInt(req.query.index)
    let quantity = parseInt(req.query.quantity)

    try {
        const turn = await Turn
            .find({})
            .limit(quantity)
            .skip(index)

        const totalTurn = await Turn.countDocuments()

        res.json({result: turn, totalPages: totalTurn})

    } catch (error) {
        console.log(error)
        next()
    }
}

// Muestra un turno por su ID
const showTurn = async (req, res, next) => {
    const turn = await Turn.findById(req.params.id)

    if(!turn) {
        res.json({mensaje : 'Ese turno no existe'})
        next()
    }
    // Mostrar el turno
    res.json(turn)
}

// Actualiza un turno por su ID
const updateTurn = async (req, res, next) => {
    try {
        const turn = await Turn.findOneAndUpdate({ _id : req.params.id }, req.body, {
            new : true
        })
        res.json(turn)
    } catch (error) {
        res.send(error)
        next()
    }
}

// Elimina un turno por su ID 
const deleteTurn = async (req, res, next) => {
    try {
        await Turn.findOneAndDelete({_id : req.params.id})
        res.json({mensaje : 'El turno se ha eliminado'})
    } catch (error) {
        console.log(error)
        next()
    }
}

export default{
    newTurn,
    showTurns,
    showTurn,
    updateTurn,
    deleteTurn
}