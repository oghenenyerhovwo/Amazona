import React from 'react'

const CheckOutSteps = props => {
    return (
        <>
            <br/> <br/>
            <div className="row checkout-steps">
                <div className={props.step1 ? "active" : ""}>Sign-in</div>
                <div className={props.step2 ? "active" : ""}>Shipping</div>
                <div className={props.step3 ? "active" : ""}>Payment</div>
                <div className={props.step4 ? "active" : ""}>Place Order</div>
            </div>
        </>
    )
}

export default CheckOutSteps
