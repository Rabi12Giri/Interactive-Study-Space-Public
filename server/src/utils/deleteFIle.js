import fs from "fs";
import * as url from "url";
import path from "path";

let deleteFile = (fileName) => {
    const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

    // __dirname gives whole folderpath
    const directoryPath = path.join(__dirname, `../../public/${fileName}`);

    fs.unlinkSync(directoryPath, (err) => {
        if (err) {
            let error = new Error(err.message);
            throw error;
        }
    });
};

export default deleteFile;
