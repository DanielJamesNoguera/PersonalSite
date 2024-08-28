
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Training from './pages/training';
import ExchangeToken from './pages/exchangeToken';
import WonderfulDemo from './pages/wonderfulDemo';
import ResetPage from './pages/reset';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<WonderfulDemo />} />
        <Route  path="/training" element={<Training />} />
        <Route  path="/reset" element={<ResetPage />} />
        <Route  path="/exchange_token" element={<ExchangeToken />} />
      </Routes>
    </Router>
  );
}

export default App;
