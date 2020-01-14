import { decodeToken } from '../services/service';

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "No tienes autorizacion" });
    }

    const token = req.headers.authorization.split(" ")[1];

    decodeToken(token)
        .then(response => {
            req.userId = response;
            next();
        })
        .catch(response => {
            res.status(response.status);
        })
}

export { isAuth };