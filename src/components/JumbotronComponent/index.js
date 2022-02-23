import React from "react"
import "./index.css"

const JumbotronComponent = ({reference,goPortfolio}) => {
    return (
        <div >
            <header ref={reference}  className="jumbotron">
                <div>
                    <h1>GET 30% DISCOUNT ON FIRST PURCHASE</h1>
                    <button className="button-28">Shop Now</button>
                </div>
            </header>
        </div>
    )
}

export default JumbotronComponent
