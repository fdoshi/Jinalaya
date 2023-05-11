const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.IMAGE_STORAGE_NAME,
    api_key: process.env.IMAGE_STORAGE_KEY,
    api_secret: process.env.IMAGE_STORAGE_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Jinalaya',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}