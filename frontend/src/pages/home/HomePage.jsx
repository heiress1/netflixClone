import React from 'react'
import HomeScreen from './HomeScreen.jsx';
import AuthScreen from './AuthScreen.jsx';

const HomePage = () => {
  const user = false;
  return (
    <div className="">
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage
