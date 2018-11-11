const fs = require('fs');
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

class Drive {    

    /**
     * realiza autentificacion en Google Drive
     */
    constructor() {
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

    /**
     * Retorna lista de archivos almacenados en Google Drive
     */
    async listFiles() {
        const listFiles = await this.drive.files.list();
        return listFiles.data.files;
    }

    /**
     * @param { String } id archivo Google Drive  
     * @param { MimeType } mime para reconocer la extension del archivo
     */
    async downloadFile(id, mime){
        let ext = mimeType.extension(mime);
        let fileName = Date.now() + '.' + ext;
        let dest = fs.createWriteStream('./tmp/' + fileName );

        console.log(1);
        const files = await this.drive.files.get({fileId: id, alt: 'media'}, {responseType: 'stream'});        
        console.log(2);
        const pipe = await files.data.on('end', () => { console.log('2.1'); }).pipe(dest);
        console.log(3);
        return pipe.path;
        
    }
}

module.exports.Drive = Drive;