module.exports = {
    asyncCatchMiddleware: fn => (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(error => {
                res.status(500).json({
                   error: error.message
                });
                next();
            });
    }
};
