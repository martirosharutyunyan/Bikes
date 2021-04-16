import nodemailer from 'nodemailer';
import { nodemailerMessageType } from '../../typescript/types';

const transporter = nodemailer.createTransport(
    {
        host: "smtp.mail.ru",
        port: 465,
        secure: true, // if 465 true else false
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    },
    {
        from: "Martiros",
    },
);

export const mailer= (message:nodemailerMessageType):void => {
    transporter.sendMail(message, (err:Error):void => {
        if (err) {
            console.log(err)
        }
    });
};

