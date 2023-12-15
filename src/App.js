import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={ < Home />} /> 
        <Route path="/login" element={ <Login />} /> 
        <Route path="/register" element={ < Register />} /> 
      </Routes> 
    </BrowserRouter>
    </>
  );
}

export default App;
