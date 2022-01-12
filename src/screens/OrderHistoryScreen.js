import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Importing components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// importing functions
import { listOrderMine } from '../actions/orderActions'

export const OrderHistoryScreen = props => {
    const {orderMineList, loading, error} = useSelector(state => state.order)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listOrderMine())
    }, [dispatch, ])

    return (
        <div>
            <h1>Order History</h1>
            {
                loading ? <LoadingBox /> :
                error ? <MessageBox variant="danger">{error} </MessageBox>:
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderMineList.map(order => {
                            const showDetail=() => {
                                props.history.push(`/order/${order._id}`)
                            }
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
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
