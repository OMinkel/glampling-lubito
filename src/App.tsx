import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Planes from './pages/Planes';
import Experiencias from './pages/Experiencias';
import Reservas from './pages/Reservas';
import './App.css'; // Keep if there's any global CSS we didn't migrate

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/experiencias" element={<Experiencias />} />
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
