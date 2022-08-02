import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Routes/Login';
import Register from './Routes/Register';
import Home from './Routes/Home';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>        
      </Routes>
    </Router>
  );
}

export default App;
