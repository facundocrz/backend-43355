import dotenv from "../config/dotenv.config.js";
import { createTransport } from "nodemailer";

const sendMail = async (req, res) => {
    const transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: dotenv.mailUser,
          pass: dotenv.mailPass,
        },
      });
    transporter.sendMail({
        from: dotenv.mailUser,
        to: req.body.email,
        subject: `Mensaje de prueba de ${dotenv.mailUser}`,
        text: 'Bienvenido a la tienda',
        html: `<h1>Texto de prueba</h1>`
    })
}

export default sendMail;