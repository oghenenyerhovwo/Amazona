import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// functions
import { listOrder, deleteOrder } from '../actions/orderActions'

// action types
import { ORDER_DELETE_RESET } from '../constants/orderConstants'

const OrderListScreen = props => {
    const {
            orderList, 
            loading, 
            error,
            loadingDelete,
            errorDelete,
            successDelete,
    } = useSelector(state => state.order)
    const dispatch = useDispatch()

    useEffect(() => {
        if(successDelete){
            dispatch({type: ORDER_DELETE_RESET})
        }
        dispatch(listOrder())
    }, [dispatch, successDelete])

    return (
        <div>
            <h1>Order</h1>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete} </MessageBox>}
            {
                loading ? <LoadingBox /> :
                error ? <MessageBox variant="danger">{error} </MessageBox>:
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>USER</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map(order => {
                            const showDetail=() => {
                                props.history.push(`/order/${order._id}`)
                            }
                            const deleteHandler= () => {
                                dispatch(deleteOrder(order._id))
                            }

                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : "No"}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : "No"}</td>
                                    <td>
                                        <button 
                                            type="button"
                                            className="small"
                                            onClick={showDetail}
                                        >
                                            Details
                                        </button>
                                        <button 
                                            type="button"
                                            className="small"
                                            onClick={deleteHandler}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default OrderListScreen
