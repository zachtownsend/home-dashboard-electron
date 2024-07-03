import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Home from './organisms/Home';
import CommuteScreen from './organisms/Commute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commute" element={<CommuteScreen />} />
      </Routes>
    </Router>
  );
}
