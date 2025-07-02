import nodemailer from "nodemailer";

const user = process.env.MAIL_EMI
const pass = process.env.PASS_EMAIL_EMI

export const sendWelcomeEmail = async (to, username) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user, 
        pass: pass 
      },
    });

    const mailOptions = {
      from: `"Farmacity 24/7" <${process.env.EMAIL_USER}>`,
      to,
      subject: '¡Bienvenido a la plataforma!',
      text: `Hola ${username}, gracias por registrarte.`,
      html: `<h2>Hola ${username}!</h2><p>Gracias por registrarte en nuestra plataforma.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📨 Correo enviado a ${to}: ${info.messageId}`);
  } catch (err) {
    console.error('❌ Error al enviar el correo:', err);
  }
};