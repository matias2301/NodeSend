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

const appReducer = ( state, action ) => {   
    switch ( action.type ) {
                
        case SHOW_ALERT:
            return {
                ...state,
                filesMsj: action.payload
            }

        case CLEAN_ALERT:
            return {
                ...state,
                filesMsj: null
            }

        case UPLOAD_FILE:
            return {
                ...state,
                loading: true
            }

        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                hashName: action.payload.hashName,
                originalName: action.payload.originalName,
                loading: null
            }
        case UPLOAD_FILE_ERROR:
            return {
                ...state,
                filesMsj: action.payload,
                loading: null
            }
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: action.payload,                
            }

        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload,                
            }

        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload,                
            }
        case CLEAN_STATE:
            return {
                ...state,
                filesMsj: null,
                hashName: '',
                originalName: '',
                loading: null,
                downloads: 1,
                password: '',
                author: null,
                url: ''               
            }
        default:
            return state;
    }
}

export default appReducer;