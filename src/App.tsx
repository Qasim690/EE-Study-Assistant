import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AiHub from './pages/AiHub'; // We import the new Hub
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calculators from './pages/Calculators';
import FormulaLibrary from './pages/FormulaLibrary';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calculators" element={<Calculators />} />
          <Route path="formulas" element={<FormulaLibrary />} />
          
          {/* 
            Now, clicking your existing navbar button (/ai) 
            loads the side-by-side view of both tools! 
          */}
          <Route path="ai" element={<AiHub />} />
          
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;