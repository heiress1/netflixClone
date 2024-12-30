import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element= {<HomePage/>} />
      <Route path="/login" element= {<LoginPage/>} />
      <Route path="/signup" element= {<SignUpPage/>} />

    </Routes>
  )
}

export default App
