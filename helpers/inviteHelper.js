const generator = require('voucher-code-generator');

module.exports = {

    generateInviteCode: () => {
        return generator.generate({
            length: process.env.INVITE_CODE_LENGTH,
            code: process.env.INVITE_CODE,
            charset: process.env.INVITE_CODE_CHARSET
        })[0];
    }
};