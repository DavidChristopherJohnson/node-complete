const sgMail = require('@sendgrid/mail');
const sendGridApiKey = process.env.SEND_GRID_API_KEY;

sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lasher.dcj@gmail.com',
        subject: 'Welcome to the app',
        text: `Hi ${name} 
            
            Welcome to the app. let me know how you get along with the app.`
    });
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lasher.dcj@gmail.com',
        subject: 'Sorry to see you go',
        text: `Goodbye ${name}
        sorry to see you go ;(`
    });
}

module.exports = { sendWelcomeEmail, sendCancelationEmail }