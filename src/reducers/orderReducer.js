import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_FAIL,
    ORDER_LIST_SUCCESS,
    ORDER_DELETE_RESET,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
} from "../constants/orderConstants";
    
    const initialState={
        loading: false,
        loading2: true,
        orderCreate: {},
        success: false,
        error: "",
        orderDetail: {},
        errorPay: "",
        orderMineList: [],
        orderList: [],
        loadingDelete: false,
        errorDelete: "",
        successDelete: false,
        loadingDeliver: false,
        errorDeliver: "",
        successDeliver: false,
    }
    
    export default function(state = initialState, action) {
      switch (action.type) {
        case ORDER_LIST_REQUEST:
        case ORDER_MINE_LIST_REQUEST:
        case ORDER_PAY_REQUEST:
        case ORDER_CREATE_REQUEST:
            return {...state, loading: true}

        case ORDER_CREATE_SUCCESS:
            return {
                ...state, 
                loading: false, 
                success: true, 
                orderCreate: action.payload.order.createdOrder,
                error: action.payload.message,
            }

        case ORDER_LIST_FAIL:
        case ORDER_MINE_LIST_FAIL:
        case ORDER_PAY_FAIL:
        case ORDER_CREATE_FAIL:
            return {...state, loading: false, error: action.payload}

        
        case ORDER_CREATE_RESET:
            return {
                ...state, 
                loading: false, 
                success: false, 
                error: "",
                orderCreate: {},
            }
        case ORDER_PAY_RESET:
            return {
                ...state, 
                loading: false, 
                success: false, 
                error: "",
            }
        case ORDER_DETAILS_REQUEST:
            return {...state, loading2: true}

        case ORDER_DETAILS_SUCCESS:
            return {
                ...state, 
                loading2: false, 
                orderDetail: action.payload,
            }

        case ORDER_DETAILS_FAIL:
            return {...state, loading2: false, error: action.payload}
        
        case ORDER_PAY_SUCCESS:
            return {
                ...state, 
                loading: false, 
                success: true, 
            }

        case ORDER_MINE_LIST_SUCCESS:
            return {
                ...state, 
                loading: false, 
                orderMineList: action.payload,
            }

        case ORDER_LIST_SUCCESS:
            return {
                ...state, 
                loading: false, 
                orderList: action.payload,
            }

        case ORDER_DELETE_REQUEST:
            return {
                ...state,
                loadingDelete: true,
            }

        case ORDER_DELETE_SUCCESS:
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            }

        case ORDER_DELETE_FAIL:
            return {
                ...state,
                loadingDelete: false,
                errorDelete: "action.payload",
            }

        case ORDER_DELETE_RESET:
            return {
                ...state,
                loadingDelete: false,
                errorDelete: "",
                successDelete: false,
            }

        case ORDER_DELIVER_REQUEST:
            return {
                ...state,
                loadingDeliver: true,
            }

        case ORDER_DELIVER_SUCCESS:
            return {
                ...state,
                loadingDeliver: false,
                successDeliver: true,
            }

        case ORDER_DELIVER_FAIL:
            return {
                ...state,
                loadingDeliver: false,
                errorDeliver: "action.payload",
            }

        case ORDER_DELIVER_RESET:
            return {
                ...state,
                loadingDeliver: false,
                errorDeliver: "",
                successDeliver: false,
            }

        default:
          return state;
      }
    }