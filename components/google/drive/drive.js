const fs = require('fs');
const { google } = require('googleapis');  

// If modifying these scopes, delete token.json.
const SCOPES = [ 'https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/drive.appdata',
'https://www.googleapis.com/auth/drive.file',
'https://www.googleapis.com/auth/drive.metadata',
'https://www.googleapis.com/auth/drive.metadata.readonly',
'https://www.googleapis.com/auth/drive.photos.readonly',
'https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = 'token.json';

class Drive{
    constructor(){
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            authorize(JSON.parse(content), listFiles);
        });  
    }



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
  authorize(credentials, callback) {
    const {
      client_secret,
      client_id,
      redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
}


/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
 listFiles(auth) {
    const drive = google.drive({
      version: 'v3',
      auth
    });
    drive.files.list({
      fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    });
  }
}

module.exports.Drive = Drive;