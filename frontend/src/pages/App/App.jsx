import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import HomePage from "../HomePage/HomePage.jsx";
import './App.css';

export default function App() {
  return (
    <div className="text-center">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
        </Routes>
      </Router>
    </div>
  );
}
