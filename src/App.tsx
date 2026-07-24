import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calculators from './pages/Calculators';
import FormulaLibrary from './pages/FormulaLibrary';
import AiHub from './pages/AiHub';
import AiQuiz from './pages/AiQuiz';
import AiAssistant from './pages/AiAssistant';
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
          
          {/* AI Features */}
          <Route path="ai" element={<AiHub />} />
          <Route path="ai-quiz" element={<AiQuiz />} />
          <Route path="ai-assistant" element={<AiAssistant />} />
          
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;