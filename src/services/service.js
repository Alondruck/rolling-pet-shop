import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../../config';


function createToken(user){
    let isAdmin = false;
    console.log("services/user._id: ", user._id);
    if(user._id == "5e21f5f177ab00277cb7023d") {isAdmin = true}
    console.log("isAdmin: ", isAdmin);
    const payload = {
        sub: user._id,
        isAdmin: isAdmin,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token){
    const decode = new Promise((resolve,reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: "El token ha expirado"
                })
            }
            resolve({
                id: payload.sub,
                isAdmin: payload.isAdmin
            });

        } catch(err){
            reject({
                status: 500,
                message: "Invalid Token"
            })
        }
    })

    return decode;
}

export {createToken, decodeToken};
