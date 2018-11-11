'use strict';

const { File } = require('./file');
const config = require('config');
const fs = require('fs');
const { Drive } = require('../google/drive/drive');
const { google } = require('googleapis');
const mimeType = require('mime-types');
const tokenFile  = require('./token.json');
const credentialsFile = require('./credentials.json');

function authorizate(){
    

    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentialsFile.installed;

    let oAuth2Client =  new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    oAuth2Client.setCredentials(tokenFile);      
   
    return new Promise((resolve, reject) =>{
        resolve(google.drive({
            version: 'v3',
            auth : oAuth2Client
        }))
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

    const drive = await authorizate();
    let ext = mimeType.extension('image/jpeg');
    let fileName = config.get("pathFile")  + Date.now() + '.' + ext;
    let dest = fs.createWriteStream(fileName);

    drive.files.get({fileId: req.params.id, alt: 'media'}, 
    {responseType: 'stream'},(err, re) => {
        re.data.on('end', () => {

            if (req.query.format === 'base64') {
                let body = fs.readFileSync(fileName);
                const fileBase64 = body.toString('base64');
                res.send(fileBase64);            
                setTimeout(()=>{
                    fs.unlinkSync(fileName);
                },3000);
            } else {
                res.download(fileName);
                setTimeout(()=>{
                    fs.unlinkSync(fileName);
                },3000);            
            }        
        })
        .on('error', err => {
            console.log('Error', err);
         })
        .pipe(dest);    
    });         
    

    // const file = await drive.downloadFile(req.params.id, 'image/jpeg');
    // console.log(4);
    // setTimeout(() => {
    //     if (req.query.format === 'base64') {
    //         let body = fs.readFileSync(file);
    //         const fileBase64 = body.toString('base64');
    //         res.send(fileBase64);            
    //         setTimeout(()=>{
    //             fs.unlinkSync(file);
    //         },3000);
    //     } else {
    //         res.download(file);
    //         setTimeout(()=>{
    //             fs.unlinkSync(file);
    //         },3000);            
    //     }
    // }, 1000);

}

async function getFiles(req, res) {
    const drive = await authorizate();
    const listFiles = await drive.files.list();    
    res.send(listFiles.data.files);
}


module.exports.addFile = addFile;
module.exports.downloadFile = downloadFile;
module.exports.getFiles = getFiles;