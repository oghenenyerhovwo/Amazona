import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Stars = props => {
    const {rating, middleValue, higherValue} = props
    const icon = rating >= higherValue ? < FaStar />
        : rating >= middleValue ? <FaStarHalfAlt />
        : <FaRegStar />

    return (
        <span>
            {icon}
        </span>
    )
}

export default Stars
