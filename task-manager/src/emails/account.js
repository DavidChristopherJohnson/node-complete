const sgMail = require('@sendgrid/mail');
const sendGridApiKey = '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';

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