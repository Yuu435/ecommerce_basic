import { NavLink, useNavigate } from "react-router-dom";
import Navigation from "./navigation";

import { useState, FormEvent } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    navigate(`/search?q=${search.trim()}`);
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to={"/"}>
          <h1>Logo</h1>
        </NavLink>
      </div>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Search</button>
      </form>

      <Navigation />
    </header>
  );
}
