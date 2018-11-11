'use strict';

const { File } = require('./file');
const config = require('config');
const fs = require('fs');
const { Drive } = require('../google/drive/drive');
const { google } = require('googleapis');
const mimeType = require('mime-types');
const tokenFile = require('./token.json');
const credentialsFile = require('./credentials.json');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
];

function authorizate(){
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentialsFile.installed;

    let oAuth2Client =  new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    oAuth2Client.setCredentials(tokenFile);      
    
    this.drive = google.drive({
        version: 'v3',
        auth : oAuth2Client
    });
}

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
            setTimeout(()=>{
                fs.unlinkSync(file);
            },3000);
        } else {
            res.download(file);
            setTimeout(()=>{
                fs.unlinkSync(file);
            },3000);            
        }
    }, 1000);

}

async function getFiles(req, res) {
    this.authorizate();
    const listFiles = this.drive.files.list();
    
    res.send(listFiles.data.files);
}


module.exports.addFile = addFile;
module.exports.downloadFile = downloadFile;
module.exports.getFiles = getFiles;