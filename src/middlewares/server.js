//import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hans.csc94@gmail.com',
        pass: '37658563'
    }
});

export default transporter;
