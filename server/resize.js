const sharp = require('sharp');
const path = require('path');

class Resize {
    constructor(folder, dimension) {
        this.folder = folder;
        this.width = dimension.width;
        this.height = dimension.height;
    }

    async save(img) {
        const filename = img.filename;
        const filepath = this.filepath(filename);

        await sharp(img.path)
        .resize(this.width, this.height, {
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