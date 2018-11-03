'use strict';

const { File } = require('./file');
const config = require('config');
const fs = require('fs');

async function addFile (newFile){
    let file = new File(newFile);    
    file = await file.save();

    fs.writeFile(
        config.get("pathFile") + file._id + "." + file.extension, 
        newFile.fileBase64, 
        {encoding: 'base64'}, 
        (err) => {
            if (err) throw err;
            console.log('archivo almacenado correctamente');
    });

    return file;
}

async function downloadFile(req , res){
    const file = await File.findById(req.params.id);
    const path = config.get("pathFile") + file._id + "." + file.extension;

    res.download(path, file.name);
}

module.exports.addFile = addFile;
module.exports.downloadFile = downloadFile;