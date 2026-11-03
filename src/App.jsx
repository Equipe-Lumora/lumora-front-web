import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Estudai from './pages/Estudai';

function Navbar() {
  return (
    <header className="bg-header py-5">
      <nav className="fixed w-full top-0 z-50 flex items-center justify-between py-4 px-8 bg-menu backdrop-blur-md">
        <div className="text-primary font-archivo text-xl">
          <Link to="/">LUMORA</Link>
        </div>
        <ul className="flex list-none gap-6 items-center">
          <li><Link to="/" className="font-work text-primary uppercase text-sm font-bold hover:text-white">Home</Link></li>
          <li>
            <Link to="/app" className="font-work bg-primary text-black px-4 py-2 rounded-full text-sm font-bold uppercase hover:bg-white transition-colors">
              Acessar App
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Estudai />} />
        </Routes>
      </div>
    </Router>
  );
}