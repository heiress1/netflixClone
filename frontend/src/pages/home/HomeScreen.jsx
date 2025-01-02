import React from 'react'
import { useAuthStore } from '../../store/authUser.js';

const HomeScreen = () => {

  const {logout} = useAuthStore();
  return (
    <div>
        <h1>homescreen</h1>
        <button onClick={logout}>Logout</button>
      
    </div>
  )
}

export default HomeScreen
