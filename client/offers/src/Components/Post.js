import React from "react"

const Post = (props) =>{
    return (
        <div className="post">
            <div className="posthead">
                  <div>
                    <h1 className="name">{props.value.offer_id}</h1>
                    <p className="location">{props.value.offer_title}</p>
                  </div>
            </div>
            <div className="imgdiv">
            <img className="imag" src={`http://localhost:5000/images/${props.value.offer_image}`} alt="random"></img>
            </div>
            <div >
                <h1 className="footer">{props.value.offer_description}</h1>
            </div>
            <div className="purchase">
                PURCHASE
            </div>
        </div>
    )
}

export default Post