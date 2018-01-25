module.exports = {
    checkDBError(err, res, next) {
        const errorCode = err.code || 0;

        switch (errorCode) {
            case 11000:
                res.status(409).send('User already exists !');
                break;
            default:
                next();
                break;
        }
    }
};
