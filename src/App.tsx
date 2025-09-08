
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import AgeCalculatorPage from './pages/AgeCalculatorPage';
import FutureEventPage from './pages/FutureEventPage';

export default function App() {
  const activeLinkStyle = {
    color: '#864cff',
    textDecoration: 'underline',
  };

  return (
    <BrowserRouter>
      <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen font-sans p-4">
        {/* Navegação */}
        <nav className="bg-white p-4 rounded-xl shadow-md mb-8 flex gap-6">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="text-gray-600 font-bold hover:text-purple-600 transition-colors"
          >
            Age Calculator
          </NavLink>
          <NavLink
            to="/Future-Event"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="text-gray-600 font-bold hover:text-purple-600 transition-colors"
          >
            Future Event Calculator
          </NavLink>
        </nav>

        {/* Conteúdo da Página Atual */}
        <main>
          <Routes>
            <Route path="/" element={<AgeCalculatorPage />} />
            <Route path="/Future-Event" element={<FutureEventPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
