import {
    AUTHENTICATED_USER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CLEAN_ALERT,
    CLOSE_SESSION
} from '../../types';

const authReducer = ( state, action ) => {   
    switch ( action.type ) {        

        case REGISTER_SUCCESS:        
        case REGISTER_ERROR:
        case LOGIN_ERROR:        
            return {
                ...state,
                message: action.payload
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                auth: true
            }
        
        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            } 

        case AUTHENTICATED_USER:            
            return {
            ...state,
            userLogged: action.payload
        }

        case CLOSE_SESSION:
            localStorage.removeItem('token');
            return {
                ...state,
                userLogged: null,
                token: null,
                auth: null
            }

        default:
            return state;
    }
}

export default authReducer;