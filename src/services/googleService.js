import googleConfig  from '../config/googleConfig';
import Storage from 'store2';

const init = async (token = false) => {
    console.log(token);
    await gapiLoadPromise;
    await new Promise((resolve, reject) => gapi.load('client', {callback: resolve, onerror: reject}));
    await gapi.client.init({});
    await gapi.client.load(googleConfig.DISCOVERY_DOCS);

    if (token) {
        gapi.client.setToken(token);
    } else {
        await signIn()
    }
}

const signIn = async () => {
    let tokenClient;
    await gisLoadPromise;

    await new Promise((resolve, reject) => {
        try {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: googleConfig.CLIENT_ID,
                scope: googleConfig.SCOPES,
                prompt: 'consent',
                callback: '',
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });

    await new Promise((resolve, reject) => {
        try {
            tokenClient.callback = (resp) => {
                if (resp.error !== undefined) {
                    reject(resp);
                }

                Storage.set('googleToken', gapi.client.getToken());
                console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
                resolve(resp);
            };

            tokenClient.requestAccessToken();
        } catch (err) {
            reject(err);
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
    console.log(files);
    let configExists = false;

    if (files && files.length > 0) {
        files.forEach(file => {
            if (file.name === 'recipes.json') {
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
    init,
    signIn,
    configExists,
    createRecipes
};

export default googleService;