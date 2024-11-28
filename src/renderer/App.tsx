import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import BusTimes from './pages/BusTimes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bus-times" element={<BusTimes />} />
      </Routes>
    </Router>
  );
}
