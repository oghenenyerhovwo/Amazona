import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants"

const initialState={
    products: [],
    loading: true,
    error: "",
    product: {},
    errorCreate: "",
    loadingCreate: false,
    successCreate: false,
    loadingDelete: false,
    errorDelete: "",
    successDelete: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loadingCreate: true,
      }

    case PRODUCT_UPDATE_SUCCESS:
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loadingCreate: false,
        successCreate: true,
      }

    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        errorCreate: action.payload,
        loadingCreate: false,
      }
      
    case PRODUCT_UPDATE_RESET:
    case PRODUCT_CREATE_RESET:
      return {
        ...state,
        product: {},
        errorCreate: "",
        loadingCreate: false,
        successCreate: false,
      }
      
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true
      }
      
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      }

    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload
      }

    case PRODUCT_DELETE_RESET:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: "",
        successDelete: false,
      }


     
    default:
      return state;
  }
}