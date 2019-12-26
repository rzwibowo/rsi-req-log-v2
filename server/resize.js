const sharp = require('sharp');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    async save(img) {
        const filename = img.filename;
        const filepath = this.filepath(filename);

        await sharp(img.path)
        .resize(128, 128, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFile(filepath);

        return filename;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`);
    }
}

module.exports = Resize;