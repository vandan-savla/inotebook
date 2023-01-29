
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes, Route, Link   } from 'react-router-dom'
import About from'./components/About'

export default function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>

      <Route exact path='/' />
      <Route exact path='/about' element={<About/>} />
      </Routes>


      
    </Router>
  );
}


