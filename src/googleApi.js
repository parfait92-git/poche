const  { google } = require('googleapis');

const path = require('path');

const fs = require('fs');

const CLIENT_ID = '76543672018-udqn450uid8bju2mn3u3t6nh66m56kq9.apps.googleusercontent.com';

const CLIENT_SECRECT = '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';

const REDEIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04VspHYBDVRbsCgYIARAAGAQSNgF-L9IrlnpCz8zeDWac6F8ssDUpXAHE_xJe4cFXwR1MTyawe5_hiXJ3eMpjEbL5ghhknk2nkQ';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRECT, REDEIRECT_URI);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'images/newcv.PNG');

async function uploadFile() {
    try {
        response = await drive.files.create({
            requestBody: {
                name: 'beautifulCv.PNG',
                mimeType: 'image/jpg'
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            }
        })
        console.log(response.data);
    }catch(err) {
        console.log(err.message);
    }
}

async function deleFile(fileId) {
    try {
        const response = drive.files.delete({
            fileId: fileId
        });
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

async function generatePublicUrl(fileId) {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })
    } catch (error) {
        console.log(error.message);
    }
}