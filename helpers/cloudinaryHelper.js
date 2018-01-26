const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const DEFAULT_IMAGE_OPTIONS = {
    // public_id: 'eugene_image',
    use_filename: true
};

module.exports = {

    uploadImage: async (image, options) => {
        const opt = {
            ...DEFAULT_IMAGE_OPTIONS,
            options
        };

        return cloudinary.v2.uploader.upload(image, opt);
    },

    removeImage: async (publicId) => {

        if (!publicId) {
            throw new Error('public id of image is required !');
        }

        return cloudinary.v2.uploader.destroy(public_id);
    }
};
