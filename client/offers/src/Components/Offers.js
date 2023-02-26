import React from 'react'
import { useState } from "react"
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom"
const Offers = () => {

  const [data, updatedata] = useState({ offer_title: "", offer_id: "", offer_description: "", offer_image: "" })
  const [msg, updatemsg] = useState(<div className="new"></div>)
  const navigate = useNavigate()
  const uploadpost = async () => {

    if (data.offer_title.length === 0 || data.offer_id.length === 0 || data.offer_description.length === 0 || data.offer_image.length === 0) {
      updatemsg(<div className="new">please give valid details</div>)
    } 
    
    else {
      const formData = new FormData()
      formData.append("offer_title", data.offer_title);
      formData.append("offer_id", data.offer_id);
      formData.append("offer_description", data.offer_description);
      formData.append("offer_image", data.offer_image);
 
      const response = await fetch("http://localhost:5000/post", {
        method: 'POST',
        body: formData
      })
      
      const resp = await response.json()
      if (resp.message === "success") {
        navigate("/offerView")
      }
    }
  }

  const deleteupload = () => {
    updatedata({ ...data, offer_title: "", offer_id: "", offer_description: "", offer_image: "" })
  }
  return (
    <div className="form2">
      <Navbar />
      <div id="form">
        <input type="file" id="file" placeholder="No file choosen" onChange={(e) => { updatedata({ ...data, offer_image: e.target.files[0] }) }}></input>
        <div id="mid">
          <input type="text" placeholder="offer_title" id="offer_title" value={data.offer_title} onChange={(e) => { updatedata({ ...data, offer_title: e.target.value }) }}></input>
          <input type="text" placeholder="offer_id" id="offer_id" value={data.offer_id} onChange={(e) => { updatedata({ ...data, offer_id: e.target.value }) }}></input>
        </div>
        <input type="text" placeholder="offer_description" id="offer_description" value={data.offer_description} onChange={(e) => { updatedata({ ...data, offer_description: e.target.value }) }}></input><br />
        <div id="clr">
          <button id="bt" onClick={deleteupload} className="design">CLEAR</button>
          <button id="btn" onClick={uploadpost} className="design">SUBMIT</button>
        </div>
        {msg}
      </div>
    </div>
  )
}

export default Offers
