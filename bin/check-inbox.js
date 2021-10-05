#!/usr/bin/env node
const sgMail = require('@sendgrid/mail');
const inquirer = require('inquirer');

require('dotenv').config()

const myEmail = 'thresh62611@gmail.com'
const recepientEmail = 'sofon31975@xeiex.com'
const chalk = require('chalk');

const myExcuses = [
    'Iam sorry i will try to finish asap',
    'too much work iam sorry',
    'about to finish and come, no worries'
]

const randomExcuseGenerator = () => {
    if (myExcuses.length !== 0) {
        const excuse = myExcuses[Math.floor(Math.random() * myExcuses.length)]
        return excuse
    } else {
        process.exit(1)
    }
}


sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: recepientEmail,
    from: myEmail,
    subject: 'Sending with SendGrid is Fun',
    html: `<strong>${randomExcuseGenerator}</strong>`,
}
// git branch - M main
// git remote add origin https://github.com/Mohamed3331/node-cli-email-inbox.git
// git push - u origin main
const sendEmail = async () => {
    try {
        const response = await sgMail.send(msg);
        console.log(chalk.green.bold('Message Sent!'))
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

const questions = [
    {
        type: 'list',
        name: 'method',
        message: 'Which method of smack u would like to use?',
        choices: ['Email', 'WhatsApp'],
        filter(val) {
            return val.toLowerCase();
        },
    },
];

inquirer.prompt(questions).then((answer) => {
    if (answer && answer.method === 'email') {
        sendEmail()
    } else {
        process.exit(1)
    }
});

