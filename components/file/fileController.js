'use strict';

const { File } = require('./file');
const config = require('config');
const fs = require('fs');
const { Drive } = require('../google/drive/drive');

async function addFile(newFile) {
    let file = new File(newFile);
    file = await file.save();

    fs.writeFile(
        config.get("pathFile") + file._id + "." + file.extension,
        newFile.fileBase64, {
            encoding: 'base64'
        },
        (err) => {
            if (err) throw err;
            console.log('archivo almacenado correctamente');
        });

    return file;
}

async function downloadFile(req, res) {
    //const file = await File.findById(req.params.id);
    //   const path = config.get("pathFile") + file._id + "." + file.extension;

    //  res.download(path, file.name);

    const drive = new Drive();
    console.log(0);
    const file = await drive.downloadFile(req.params.id, 'image/jpeg');
    console.log(4);
    setTimeout(() => {
        if (req.query.format === 'base64') {
            let body = fs.readFileSync(file);
            const fileBase64 = body.toString('base64');
            res.send(fileBase64);
        } else {
            res.download(file);
        }
    }, 1000);

}

async function getFiles(req, res) {
    const drive = new Drive();
    const files = await drive.listFiles();

    res.send(files);
}


module.exports.addFile = addFile;
module.exports.downloadFile = downloadFile;
module.exports.getFiles = getFiles;