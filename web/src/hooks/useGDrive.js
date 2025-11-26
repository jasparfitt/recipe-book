import useGoogleSignIn from "./useGoogleSignIn";
import { useCallback } from "react";
import googleConfig  from '../config/googleConfig';

const useGDrive = () => {
  const [googleSignIn] = useGoogleSignIn();

  const makeCall = useCallback(async (callback) => {
    try {
      const res = await callback();
      
      return res;
    } catch (e) {
      try {
        if (e.status === 401 || e.status === 403) {
          await googleSignIn();
          return await callback();
        } else {
          throw e;
        }
      } catch (err) {
        throw err;
      }
    }
  }, []);

  const getJson = useCallback(async (fileId) => {
    const response = await makeCall(() => gapi.client.drive.files.get({ fileId, alt: 'media' }));

    return JSON.parse(response.body);
  }, [makeCall]);

  const list = useCallback(async (params) => {
    const response = await makeCall(() => gapi.client.drive.files.list(params));
        
    return response.result;
  }, [makeCall]);

  const getForm = useCallback((metadata, fileContent, mimeType = '') => {
    const file = new Blob([fileContent], {type: mimeType || metadata.mimeType});
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    const accessToken = gapi.client.getToken().access_token;
    const header = new Headers({ 'Authorization': 'Bearer ' + accessToken });

    return {body: form, headers: header};
  }, []);

  const newMultipartUploader = useCallback(() => {
    const uploader = {
      data: null,
      mimeType: null,
      fileId: null,
      requestBody: null,
      setData: (data, mimeType) => {
        uploader.data = data;
        uploader.mimeType = mimeType;

        return uploader;
      },
      setIdOfFileToUpdate: (fileId) => {
        uploader.fileId = fileId;

        return uploader;
      },
      setRequestBody: (requestBody) => {
        uploader.requestBody = requestBody;

        return uploader;
      },
      async execute() {
        let path = '';
        let method = 'POST';
        let metadata = {
          'mimeType': uploader.mimeType,
        };

        if (uploader.fileId) {         
          path = `/${uploader.fileId}`;
          method = 'PATCH';
        } else {
          metadata = { ...metadata, ...uploader.requestBody };
        }

        const form = getForm(metadata, uploader.data, uploader.mimeType);

        const res = await makeCall(() => fetch(`${googleConfig.FILES_URL}${path}?uploadType=multipart&fields=id`, {
          ...form,
          method,
        }));

        return await res.json();
      }
    }

    return uploader;
  }, []);

  const getDrive = useCallback(async () => {
    return {
      files: {
        getJson,
        list,
        newMultipartUploader,
      }
    };
  }, [getJson]);

  return [getDrive];
}

export default useGDrive;