import { NavLink, useNavigate } from "react-router-dom";
import Navigation from "./navigation";
import "./header.css";

import { useState, FormEvent } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    navigate(`/search?q=${search.trim()}`);
  };

  return (
    <header className="header-wrap">
      <div className="logo">
        <NavLink to={"/"}>
          <h1>Logo</h1>
        </NavLink>
      </div>

      <form className="form-Search" onSubmit={handleSearch}>
        <input
          className="search"
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-search">Search</button>
      </form>

      <Navigation />
    </header>
  );
}
