import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Replies from './components/Replies';
import './App.css';

//Login.js and Register.js filesa are the authentication pages of the web application.
// Home.js file respresents the dashboard page show after authentication. It allows users to
// create and teawct ot the post threads
//Replies.js file displaus the response on each post and allows users to reply  to the post thread
// The Nav.js is the navigation bar we will configure

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register'  element={<Register/>}></Route>
          <Route path= '/dashboard'  element={<Home/>}></Route>
          <Route path= '/:id/replies'  element={<Replies/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
