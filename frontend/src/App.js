import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import PlantDetailsPage from "./pages/PlantDetailsPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import SearchPage from "./pages/SearchPage";
import PlantDatabasePage from "./pages/PlantDatabasePage";
function Navbar() {
  return (
    <div className="w-full bg-gray-100 mb-2.5">
      <nav className="flex items-end m-auto w-3/4 gap-12 py-3 font-medium">
        <div className="text-2xl font-light">
          <Link to="/">
            <FontAwesomeIcon className="pr-2.5 text-green-700" icon={faLeaf} />
            Piedmont Virginia Native Plant Database
          </Link>
        </div>
        <div className="text-md">
          <Link to="/">Home</Link>
        </div>
        <div className="text-md">
          <Link to="/search">Search</Link>
        </div>
        <div className="text-md">
          <Link to="/about">About</Link>
        </div>
      </nav>
    </div>
  );
}
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="m-auto w-3/4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/plant/:id" element={<PlantDetailsPage />} />
            <Route path="/nativeplants" element={<PlantDatabasePage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
