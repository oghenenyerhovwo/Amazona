import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

const LoadingBox = () => {
    return (
        <div className="loading">
            <FontAwesomeIcon size="lg" className="fa-spin" icon={faSpinner}/>Loading...
        </div>
    )
}

export default LoadingBox
