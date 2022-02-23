// importing modules and hooks
import React from 'react'

// importing components
import Product from "../components/Product"
import JumbotronComponent from "../components/JumbotronComponent"

const HomeScreen = () => {
    return (
         <> 
            <JumbotronComponent />
            <br />
            <div>
                <div className="row center">
                    <Product />
                </div>
            </div>
        </>
    )
}

export default HomeScreen
