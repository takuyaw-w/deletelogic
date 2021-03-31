// @ts-check
const fs = require("fs/promises");
const path = require("path");

const getLogFiles = async () => {
    const files = await fs.readdir("./logs", {withFileTypes: true});
    return files.map((val, index) => {
        return ({
            index: index,
            fileName: val.name,
            filePath: path.resolve(__dirname, "./logs", val.name)
        });
    });
}

const getLogTotalSize = async () => {
    const files = await getLogFiles();

    let totalSize = 0;

    for (const key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
            const file = files[key];
            totalSize += (await fs.stat(file.filePath)).size;
        }
    }

    return convertBytes(totalSize);
}

const convertBytes = (bytes) => {
    return Math.floor(bytes / 1024 / 1024);
}

const deleteLogs = async () => {
    const files = await getLogFiles();
    let index = 0;
    while(await getLogTotalSize() > 25) {
        await fs.unlink(files[index].filePath);
        index++;
    }
}

(async () => {
    console.log("start: ", await getLogTotalSize());
    if (await getLogTotalSize() >= 30) {
        await deleteLogs();
    }
    console.log("end: ",await getLogTotalSize());
})();