import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h1 className="text-2xl p-2">Home</h1>;
}
function About() {
  return <h1 className="text-2xl p-2">About</h1>;
}
function Users() {
  return <h1 className="text-2xl p-2">Users</h1>;
}

function Navbar() {
  return (
    <Router>
      <div>
        <nav className="flex items-center w-full gap-10 bg-green-200 p-2 font-medium">
          <div className="text-2xl">Piedmont Plants Database</div>
          <div className="text-lg">
            <Link to="/">Home</Link>
          </div>
          <div className="text-lg">
            <Link to="/about">About</Link>
          </div>
          <div className="text-lg grow">
            <Link to="/users">Plants</Link>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Navbar;
