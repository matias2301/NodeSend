import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import {
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    UPLOAD_FILE,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    CLEAN_ALERT,
    SHOW_ALERT,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from '../../types';
import axiosClient from '../../config/axios';

const AppState = ({ children }) => {

    const initialState = {
        filesMsj: null,
        hashName: '',
        originalName: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: ''
    }

    const [state, dispatch] = useReducer(appReducer, initialState);

    // show alert
    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            });
        }, 3000);
    }

    // upload files to the server
    const uploadFile = async (formData, fileName) => {        

        dispatch({
            type: UPLOAD_FILE            
        });

        try {
            const response = await axiosClient.post('/api/files', formData);

            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    hashName: response.data.file,
                    originalName: fileName
                }
            });

        } catch (error) {            
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.message
            });
        }
    }

    // create a link to download the updated file
    const createLink = async () => {
        const data = {
            name: state.hashName,
            originalName: state.originalName,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const response = await axiosClient.post('/api/links', data );
            
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: response.data.msg
            });
        } catch (error) {
            console.log(error);
        }
    }

    // clean all state
    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE
        });
    }

    // add User Password
    const addPassword = value => {
        dispatch({
            type: ADD_PASSWORD,
            payload: value
        });
    }

    // add numbers of downloads
    const addDownloads = value => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: value
        });
    }

    return (
        <appContext.Provider
            value={{
                filesMsj: state.filesMsj,
                hashName: state.hashName,
                originalName: state.originalName,
                loading: state.loading,
                downloads: state.downloads,
                password:  state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createLink,
                cleanState,
                addPassword,
                addDownloads
            }}
        >
            { children }
        </appContext.Provider>
    )
}

export default AppState;