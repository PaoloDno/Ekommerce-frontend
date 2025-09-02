import React from "react";
import {Link} from "react-router-dom"
export default function HeaderComponent() {
  return (
    <header className="bg-gray-200 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Site</h1>
        <nav className="space-x-4">
          <Link to="/" >Landing</Link>
          <Link to="home" >Home</Link>
        </nav>
      </div>
    </header>
  );
}
