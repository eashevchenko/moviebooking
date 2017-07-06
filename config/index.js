module.exports = {
    environment: 'development',
    secret: {
        secretKey: 'secret',
        sessionExpiration: 60 * 60 * 24 * 7
    },
    userRoles: {
        manager: 'manager',
        viewer: 'viewer'
    },
    inviteCode: {
        charset: '0123456789',
        length: 16,
        code: 16

    }
};