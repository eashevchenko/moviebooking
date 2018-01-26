const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

module.exports = {

    sendSMS: (body, to, from) => {
       return  client.messages.create({
            body: body,
            to: to,
            from: from
        });
    },

    createCall: (url, to, from) => {
        return client.calls.create({
           url: url,
           to: to,
           from: from
        });
    }
}
