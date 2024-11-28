import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ViewReviews from './pages/allReviews';
import AddReview from './pages/addReview';
import NavBar from './component/navbar';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ViewReviews />} />
        <Route path='/add' element={<AddReview/>} />
      </Routes>
    </Router>
  );
}

export default App;