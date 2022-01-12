// importing modules/hooks
import React from 'react'

// importing components
import Stars from "./Stars"

const Rating = props => {
    const {rating,numReviews,} = props
    return (
        <>
            <div className="rating">
                <Stars 
                    rating={rating} 
                    middleValue={0.5}
                    higherValue={1}
                />
                <Stars 
                    rating={rating} 
                    middleValue={1.5}
                    higherValue={2}
                />
                <Stars 
                    rating={rating} 
                    middleValue={2.5}
                    higherValue={3}
                />
                <Stars 
                    rating={rating} 
                    middleValue={3.5}
                    higherValue={4}
                />
                <Stars 
                    rating={rating} 
                    middleValue={4.5}
                    higherValue={5}
                />
                <span> {`${numReviews} reviews`} </span>
            </div>  
        </>
    )
}

export default Rating
