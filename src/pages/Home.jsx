import React from 'react'
import { UserAuth } from '../context/AuthContext';


const Home = () => {
  const { user } = UserAuth();

  return (
    <div>

      <div className='text-center text-3xl font-bold py-8'>
        <h1>Home Page</h1>
        <p>Current User: {user?.displayName}</p>

      </div>
    </div>
  )
}

export default Home