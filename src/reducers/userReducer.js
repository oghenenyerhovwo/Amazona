import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL,
    USER_SIGNOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL, 
} from "../constants/userConstants";
  
  const initialState={
      user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {},
      loading: false,
      error: "",
      updateMessage: "",
      updateLoading: false,
      loadingUserList: false,
      errorUserList: "",
      userList: [],
      loadingDelete: false,
      errorDelete: "",
      successDelete: false,
      loadingUpdate: false,
      errorUpdate: "",
      successUpdate: false,
      userDetail: {}
  }
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
        case USER_SIGNIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: "",
                updateMessage: "",
            };

        case USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updateLoading: true,
            };

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetail: action.payload,
                loading: false,
            };
        case USER_SIGNIN_SUCCESS:
        case USER_REGISTER_SUCCESS: 
            return {
                ...state,
                user: action.payload,
                loading: false,
            };

        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload.updatedData,
                updateMessage: action.payload.message,
                updateLoading: false,
                updateSuccess: true,
            }

        case USER_DETAILS_FAIL:
        case USER_SIGNIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
        };

        case USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                updateMessage: action.payload,
                updateLoading: false,
            }

        case USER_UPDATE_PROFILE_RESET:
            return {
                ...state,
                updateMessage: "",
                updateLoading: false,
                updateSuccess: false,
            }

        case USER_SIGNOUT:
            return {user: {}, loading: false, error: ""};

        case USER_LIST_REQUEST:
            return {
                ...state,
                loadingUserList: true,
            }
            
        case USER_LIST_SUCCESS:
            return {
                ...state,
                loadingUserList: false,
                userList: action.payload,
            }

         case USER_LIST_FAIL:
            return {
                ...state,
                loadingUserList: false,
                errorUserList: action.payload,
            }

        case USER_DELETE_REQUEST:
            return {
                ...state,
                loadingDelete: true,
            }

        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            }

        case USER_DELETE_FAIL:
            return {
                ...state,
                loadingDelete: false,
                errorDelete: action.payload,
            }

        case USER_DELETE_RESET:
            return {
                ...state,
                loadingDelete: false,
                errorDelete: "",
                successDelete: false,
            }

        case USER_UPDATE_REQUEST:
            return {
                ...state,
                loadingUpdate: true,
            }

        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loadingUpdate: false,
                successUpdate: true,
            }

        case USER_UPDATE_FAIL:
            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: action.payload,
            }

        case USER_UPDATE_RESET:
            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: "",
                successUpdate: false,
                userDetail: {},
            }
  

      default:
        return state;
    }
  }