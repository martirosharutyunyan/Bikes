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
    transporter.sendMail(message, (err:Error):void => {
        if (err) {
            console.log(err)
        }
    });
};


