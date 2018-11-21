'use strict';

const { File } = require('./file');
const { google } = require('googleapis');
const config = require('config');
const fs = require('fs');
const mimeType = require('mime-types');
const tokenFile = require('./token.json');
const Status = require('../enums/status.enums')
const credentialsFile = require('./credentials.json');

function authorizate() {
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentialsFile.installed;

    let oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    oAuth2Client.setCredentials(tokenFile);

    return new Promise((resolve, reject) => {
        resolve(google.drive({
            version: 'v3',
            auth: oAuth2Client
        }))
    });
}

async function addFile(req) {

    try {
        req.files.uploads.forEach(async (obj, index) => {
            console.log(" file " + index);

            let file = new File({
                extension: mimeType.extension(obj.type),
                name: obj.originalFilename
            });

            const drive = await authorizate();
            const fileMetadata = {
                'name': obj.originalFilename
            };

            const media = {
                mimeType: obj.type,
                body: fs.createReadStream(obj.path) 
            };

            const googleFile = await drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            });

            const permissions = {
                role: 'reader',
                type: 'anyone'
            }

            const permise = await drive.permissions.create({
                fileId: googleFile.data.id,
                resource: permissions,
                fields: 'id'
            });

            file.googleId = googleFile.data.id;
            file = file.save();

            console.log('archivo almacenado correctamente');
            return file;
        });
    } catch (ex) {
        console.log("error :");
        console.error(ex);
    }
}

async function downloadFile(req, res) {
    const file = await File.findById(req.params.id);
    const drive = await authorizate();

    let fileName = config.get("pathFile") + file.name + '.' + file.extension;
    let dest = fs.createWriteStream(fileName);

    drive.files.get({
        fileId: req.params.id,
        alt: 'media'
    }, {
        responseType: 'stream'
    }, (err, re) => {
        re.data.on('end', () => {

                if (req.query.format === 'base64') {
                    let body = fs.readFileSync(fileName);
                    const fileBase64 = body.toString('base64');
                    res.send(fileBase64);
                    setTimeout(() => {
                        fs.unlinkSync(fileName);
                    }, 3000);
                } else {
                    res.download(fileName);
                    setTimeout(() => {
                        fs.unlinkSync(fileName);
                    }, 3000);
                }
            })
            .on('error', err => {
                console.log('Error', err);
            })
            .pipe(dest);
    });

}

async function getFiles(req, res) {
    const result = await File.find({
        'status': Status.active
    });

    res.send(result);
}

async function saveFile(req, res) {

    const file = await addFile(req);

    res.send(file);
}


module.exports.addFile = addFile;
module.exports.saveFile = saveFile;
module.exports.downloadFile = downloadFile;
module.exports.getFiles = getFiles;