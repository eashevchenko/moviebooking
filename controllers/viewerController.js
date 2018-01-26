const ViewerInfo = require('../model/viewer_info');
const cloudinaryHelper = require('../helpers/cloudinaryHelper');
const _ = require('lodash');

const fs = require('fs');

module.exports = {

    getViewersInfo: async (req, res, next) => {
        try {
            const viewersInfo = await ViewerInfo
                .find({});
            res.status(200).json(viewersInfo);
        } catch (err) {
            next(err);
        }
    },

    uploadProfileImage: async (req, res, next) => {
        try {
            if (!!req.body.photo) {

                const viewer = await ViewerInfo.findOne({email: req.body.email});

                if (viewer) {
                    const photoString = req.body.photo;
                    const {secure_url, public_id} = await cloudinaryHelper.uploadImage(photoString);
                    const upsertData = {
                        profilePhotoUrl: secure_url,
                        profilePhotoName: public_id
                    };

                    await ViewerInfo.update({_id: viewer.id}, upsertData, {upsert: true});

                    const responseObj = {
                        email: viewer.email,
                        ...upsertData
                    };

                    res.status(200).json(responseObj);
                }

                res.status(409).send('no user');
            } else {
                res.status(404).send('photo not uploaded !');
            }
        } catch (error) {
            next(error);
        }
    }
};
