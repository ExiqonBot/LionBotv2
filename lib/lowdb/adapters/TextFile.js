const fs = require('fs');

class TextFile {
    constructor(filename) {
        this.filename = filename;
        this.init();
    }

    async init() {
        const steno = await import('steno');
        this.writer = new steno.Writer(this.filename);
    }

    async read() {
        let data;
        try {
            data = await fs.promises.readFile(this.filename, 'utf-8');
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                return null;
            }
            throw e;
        }
        return data;
    }

    async write(str) {
        await this.init(); // Ensure writer is initialized
        return this.writer.write(str);
    }
}

module.exports = { TextFile };
