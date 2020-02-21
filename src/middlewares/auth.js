import { decodeToken } from '../services/service';

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "No tienes autorizacion" });
    }

    const token = req.headers.authorization.split(" ")[1];

    decodeToken(token)
        .then(response => {
            req.userId = response.id;
            req.isAdmin = response.isAdmin;
            console.log({
                userId: req.userId,
                isAdmin: req.isAdmin
            })
            next();
        })
        .catch(response => {
            res.status(response.status);
        })
}

function isAdmin(req, res, next) {
    if (req.isAdmin) next();
    else return res.send({
        message: 'Sólo permisos de administrador!'
    });
}

export { isAuth, isAdmin };