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

const makeCall = async (callback) => {
    try {
        return await callback();
    } catch (e) {
        if (e.status === 401 || e.status === 403) {
            await signIn();
            return await callback();
        } else {
            throw e;
        }
    }
}

const recipesExists = async () => {
    const response = await makeCall(() => gapi.client.drive.files.list({
        spaces: 'appDataFolder',
        fields: 'nextPageToken, files(id, name)',
        pageSize: 100
    }));

    const files = response.result.files;
    console.log(files);
    let exists = false;

    if (files && files.length > 0) {
        files.forEach(file => {
            if (file.name === 'recipes.json') {
                exists = file.id;
            }
        });
    }

    return exists;
}

const createRecipes = async (recipies) => {
    const fileContent = JSON.stringify(recipies);
    const metadata = {
        'name': 'recipes.json',
        'mimeType': 'application/json',
        'parents': ['appDataFolder'],
    };
    
    const form = getForm(metadata, fileContent);
    
    await makeCall(() => fetch(googleConfig.FILES_URL+'?uploadType=multipart&fields=id', {
        ...form,
        method: 'POST',
    }));
}

const createFile = async (html, name) => {
    const metadata = {
        'name': name,
        'mimeType': 'application/vnd.google-apps.document',
    };
    
    const form = getForm(metadata, html, 'text/html');
    
    await makeCall(() => fetch(googleConfig.FILES_URL+'?uploadType=multipart&fields=id', {
        ...form,
        method: 'POST',
    }));
};

const updateFile = async (recipies, id) => {
    const fileContent = JSON.stringify(recipies);
    const metadata = {
        'mimeType': 'application/json',
    };

    const form = getForm(metadata, fileContent);
    
    await makeCall(() => fetch(googleConfig.FILES_URL+'/'+id+'?uploadType=multipart&fields=id', {
        ...form,
        method: 'PATCH'
    }));
}

const getFile = async (id) => {
    const response = await makeCall(() => gapi.client.drive.files.get({fileId: id, alt: 'media'}));

    return JSON.parse(response.body);
}

const getForm = (metadata, fileContent, mimeType = '') => {
    const file = new Blob([fileContent], {type: mimeType || metadata.mimeType});
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);

    const accessToken = gapi.client.getToken().access_token;
    const header = new Headers({ 'Authorization': 'Bearer ' + accessToken });

    return {body: form, headers: header};
}

const googleService = {
    init,
    signIn,
    recipesExists,
    createRecipes,
    updateFile,
    getFile,
    createFile
};

export default googleService;