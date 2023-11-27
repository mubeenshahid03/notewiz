import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Registeration from './Components/Registeration';
import Logout from './Components/Logout';
import Alertbanner from './Components/Alertbanner'
import { useState } from 'react';
import Footer from './Components/Footer';

function App() {
//functionality for foooter it will only diplsay when user have token
const isLoggedIn = localStorage.getItem("token");

//making a global stat for alert and global function that set values we pass in function in alert state
const [alert, setAlert] = useState(null)

const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type

    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    
    {/* i make comment to alert component for later use and understanding how to use it */}
    {/* <div style={{height:"30px",width:"100%"}}>
    <Alertbanner alert={alert}/>
    </div> */}
    <Routes>
    <Route path='/' element={isLoggedIn ? <Home showalert={showalert} /> : <Navigate to='/login' />} />
    <Route  exact path='/about' element={  <About /> }/>
    <Route exact path='/login' element={<Login showalert={showalert } />} />
    <Route exact path='/register' element={<Registeration Login showalert={showalert } />} />
    <Route exact path='/logout' element={<Logout />} />
    </Routes>
    </Router>
    {isLoggedIn && <Footer />} {/* Render Footer only if the user is logged in */}
    </NoteState>
    </>
  );
}

export default App;
