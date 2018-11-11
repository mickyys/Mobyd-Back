const fs = require('fs');
const { google } = require('googleapis');
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

        this.oAuth2Client =  new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        this.oAuth2Client.setCredentials(tokenFile);                    
    }

    /**
     * Retorna lista de archivos almacenados en Google Drive
     */
    async listFiles() {
        const drive = google.drive({
            version: 'v3',
            auth : this.oAuth2Client
        });
     
        const listFiles = await drive.files.list();
        return listFiles.data.files;
    }
}

module.exports.Drive = Drive;