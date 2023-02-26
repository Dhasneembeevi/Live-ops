import React from 'react'
import { useEffect, useState } from "react"
import Post from "./Post"
import Navbar from "./Navbar"

const OfferView = () => {
    
  
      const [data, updatedata] = useState([])
      useEffect(() => {
        fetch("http://localhost:5000").then((res) => {
            console.log(res)
          return res.json()
        
        }).then((data) => {
          updatedata(data.result.reverse())
        })
      }, [])
      return (
        <div className="App">
          <Navbar/>
          {
            data.map((user, index) => {
              return (
                <Post value={user} key={index} />
              )
            })
          }
        </div>
      );
    }

export default OfferView
