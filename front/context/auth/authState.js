import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import {
    AUTHENTICATED_USER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CLEAN_ALERT,
    CLOSE_SESSION
} from '../../types';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({ children }) => {

    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        auth: null,
        userLogged: null,
        message: null
    }
    
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    //Register user
    const registerUser = async values => {
    
        try {
            const response = await axiosClient.post('/api/users', values);            
            
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.msj
            });

        } catch (error) {            
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.msj
            });
        }
        
        //Clean Alert
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            });
        }, 3000);
    }

    //Login
    const loginUser = async values => {
        try {
            const response = await axiosClient.post('/api/auth', values);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.token
            });
        } catch (error) {                      
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msj
            });       
        }
        //Clean Alert
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            });
        }, 3000);
    }

    //Verify if there's an authenticated user
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');        
        if(token) tokenAuth(token)

        try {
            const response = await axiosClient.get('/api/auth');            
            if( response.data.user ){
                dispatch({
                    type: AUTHENTICATED_USER,
                    payload: response.data.user
                });                
            }
        } catch (error) {                      
            dispatch({
                type: LOGIN_ERROR,
                payload: error.message
            }); 
        }
    }

    //close session
    const closeSession = async () => {
        dispatch({
            type: CLOSE_SESSION
        });
    }

    return (

        <authContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                userLogged: state.userLogged,
                message:  state.message,
                registerUser,
                loginUser,
                authenticatedUser,
                closeSession      
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;