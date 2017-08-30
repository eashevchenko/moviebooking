const accountSid = 'ACe6bff8f4cd8c08bd5b088616f2c59c1f'; // Your Account SID from www.twilio.com/console
const authToken = '36fb029f5ddd847ed2b7ea641421c0a6';   // Your Auth Token from www.twilio.com/console

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