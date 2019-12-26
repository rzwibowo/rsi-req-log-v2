const multer = require('multer');
const path = require('path');
const uuidv4 =  require('uuid/v4');


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img-up'),
    filename: (req, file, cb) => {
        const filename = uuidv4();
        let filetype;
        switch (file.mimetype) {
            case "image/png":
                filetype = "png";
                break;
            case "image/jpeg":
                filetype = "jpg";
                break;
            default:
                filetype = "jpg";
                break;
        }

        cb(null, `${filename}.${filetype}`);
    }
})

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024
    },
    storage: storage
});

module.exports = upload;