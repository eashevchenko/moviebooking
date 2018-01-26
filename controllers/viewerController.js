const ViewerInfo = require('../model/viewer_info');

module.exports = {

    getViewersInfo: async (req, res, next) => {
        try {
            const viewersInfo = await ViewerInfo
                .find({});
            res.status(200).json(viewersInfo);
        } catch (err) {
            next(err);
        }
    }
};
