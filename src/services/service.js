import jwt from 'jwt-simple';
import moment from 'moment';


function createToken(user){

    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, 'miclavedetoken');
}

function decodeToken(token){
    const decode = new Promise((resolve,reject) => {
        try {
            const payload = jwt.decode(token, 'miclavedetoken');
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: "El token ha expirado"
                })
            }
            resolve(payload.sub);

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