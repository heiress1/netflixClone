import {Route, Routes, Navigate} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import React, {useEffect} from 'react';
import {Loader} from 'lucide-react';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const {user, isCheckingAuth, authCheck} = useAuthStore();
  console.log("user", user);
  //useeffoect is a hook in react that allows you to perform side effects in function components
  //side effects include data fetching or manually changing the dom
  //useeffect takes two arguments: a function the contains side effect logic
  //an array of dependencies
  //the effect will run after the initial render and when the dependencies change
  useEffect(() => {
    authCheck();
    //by using authChech as a dependency, the effect will run when authCheck changes
  },[authCheck]);

  if (isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center h-full bg-black">
          {/* lucide component */}
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>

      </div>
    )
  }
  return (
    <>
    <Routes>
      <Route path="/" element= {<HomePage/>} />
      <Route path="/login" element= {!user ? <LoginPage/> : <Navigate to={"/"}/> } />
      {/* it will decided witch page to show based on the user state */}
      <Route path="/signup" element= {!user ? <SignUpPage/>: <Navigate to={"/"} />} />
      <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"}/>} />

      <Route path="/search" element={user ?<SearchPage/> : <Navigate to={"/login"}/>} />
      <Route path="/history" element={user ?<HistoryPage/> : <Navigate to={"/login"}/>} />
      <Route path="/*" element={<NotFoundPage/>} />

    </Routes>
    <Footer/>

    <Toaster/>
    </>
    
  )
}

export default App
