import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1> LIVE OPS STORE</h1>
      <h2> Welcome, Please enter your Details..!</h2>
      <h4> Login to proceed further..</h4>
      <Link to='/login'>
        <button> Login </button>
      </Link>

      <br>
      </br>
      <h4>Don't have an Account? </h4>
      <Link to='/register'>

        <button> Register </button>
      </Link>
    </div>
  )
}

export default Home
