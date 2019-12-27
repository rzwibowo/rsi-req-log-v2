const fs = require('fs');
const path = require('path');

const deleteImg = function (imgName) {
    const imgThumbPath = path.join(__dirname, '../public/img-up/thumb/');
    const imgPath = path.join(__dirname, '../public/img-up/');

    fs.unlink(imgThumbPath + imgName, err => {
        if (err) throw err;
        console.log('deleted thumbnail');
    });

    fs.unlink(imgPath + imgName, err => {
        if (err) throw err;
        console.log('deleted img');
    });
}

module.exports = deleteImg;