import nodemailer from 'nodemailer';
import { nodemailerMessageType } from '../../typescript/types';
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})

export const mailer = (message:nodemailerMessageType):void => {
    transporter.sendMail(message, console.log);
};


// mailer({
//     from:"hecanivclub.am",
//     html:"ստեղ ապրանք չկա ուղղակի թեստի համարա",
//     subject:"դլահսլդասն",
//     // to:'tahku_ohjluhe@mail.ru'
//     to:"Vazgen107@gmail.com"
// })