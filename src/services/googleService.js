import { BehaviorSubject } from 'rxjs';
import googleConfig  from '../config/googleConfig';

const signInSubject = new BehaviorSubject(false);

const signIn = async () => {
    let tokenClient;
    await gapiLoadPromise;
    await new Promise((resolve, reject) => gapi.load('client', {callback: resolve, onerror: reject}));
    try {
    await gapi.client.init({});
    } catch (e) {console.log(e);}
    try {
    await gapi.client.load(googleConfig.DISCOVERY_DOCS);
    } catch (e) {console.log(e);}

    await gisLoadPromise;
    await new Promise((resolve, reject) => {
        try {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: googleConfig.CLIENT_ID,
                scope: googleConfig.SCOPES,
                prompt: 'consent',
                callback: '',  // defined at request time in await/promise scope.
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
    await new Promise((resolve, reject) => {
        try {
          // Settle this promise in the response callback for requestAccessToken()
            tokenClient.callback = (resp) => {
                if (resp.error !== undefined) {
                    reject(resp);
                }
                // GIS has automatically updated gapi.client with the newly issued access token.
                console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
                resolve(resp);
            };
            tokenClient.requestAccessToken();
        } catch (err) {
            console.log(err)
        }
    });
}

const configExists = async () => {
    const response = await gapi.client.drive.files.list({
        spaces: 'appDataFolder',
        fields: 'nextPageToken, files(id, name)',
        pageSize: 100
    })

    const files = response.result.files;
    let configExists = false;

    if (files && files.length > 0) {
        files.forEach(file => {
            if (file.name == 'recipes.json') {
                configExists = true;
            }
        });
    }

    return configExists;
}

const createRecipes = async (recipies) => {
    const fileContent = JSON.stringify(recipies);
    const file = new Blob([fileContent], {type: 'application/json'});
    const metadata = {
        'name': 'recipes.json',
        'mimeType': 'application/json',
        'parents': ['appDataFolder'],
    };

    const accessToken = gapi.client.getToken().access_token;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: metadata.mimeType}));
    form.append('file', file);
    
    fetch(googleConfig.FILES_URL+'?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
        body: form,
    }).then((res) => {
        return res.json();
    }).then(function(val) {
        console.log(val);
    });
}

const googleService = {
    signIn,
    configExists,
    createRecipes,
    signInSubject
};

export default googleService;