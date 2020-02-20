import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../../config';
import nodemailer from 'nodemailer';


function createToken(user, isAdmin) {
    const payload = {
        sub: user._id,
        isAdmin: isAdmin,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    const decode = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: "El token ha expirado"
                })
            }
            resolve({
                id: payload.sub,
                isAdmin: payload.isAdmin
            });

        } catch (err) {
            reject({
                status: 500,
                message: "Invalid Token"
            })
        }
    })

    return decode;
}

function email() {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        // Message object
        let message = {
            from: 'Sender Name <sender@example.com>',
            to: 'hans.huttmann1@gmail.com',
            subject: 'Nodemailer is unicode friendly ✔',
            text: 'Hello to myself!',
            html: '<p><b>Hello</b> to myself!</p>'
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}

export { createToken, decodeToken, email };
