import {
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_RESET,
} from "../constants/uploadConstants"

const initialState={
    loadingUpload: false,
    successUpload: false,
    uploadUrl:"",
    errorUpload: ""
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loadingUpload: true,
      }

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploadUrl: action.payload,
        loadingUpload: false,
        successUpload: true,
      }

    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        errorUpload: action.payload,
        loadingUpload: false,
      }
      
    case UPLOAD_IMAGE_RESET:
      return {
        ...state,
        uploadUrl: "",
        errorUpload: "",
        loadingUpload: false,
        successUpload: false,
      }


     
    default:
      return state;
  }
}