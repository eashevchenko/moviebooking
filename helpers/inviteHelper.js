const generator = require('voucher-code-generator');

const {inviteCode} = require('../config');

module.exports = {

    generateInviteCode: () => {
        return generator.generate({
            length: inviteCode.length,
            code: inviteCode.code,
            charset: inviteCode.charset
        })[0];
    }
};