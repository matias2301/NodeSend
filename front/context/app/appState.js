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
    SHOW_ALERT
} from '../../types';
import axiosClient from '../../config/axios';

const AppState = ({ children }) => {

    const initialState = {
        filesMsj: null,
        hashName: '',
        originalName: '',
        loading: null
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

    return (
        <appContext.Provider
            value={{
                filesMsj: state.filesMsj,
                hashName: state.hashName,
                originalName: state.originalName,
                loading: state.loading,
                showAlert,
                uploadFile                
            }}
        >
            { children }
        </appContext.Provider>
    )
}

export default AppState;