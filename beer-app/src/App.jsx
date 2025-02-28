import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://api.sampleapis.com/beers/ale")
      .then((response) => setBeers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🍺 Beer Explorer</h1>
      <input
        type="text"
        placeholder="Search for a beer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="card">
            <img src={beer.image} alt={beer.name} />
            <h2>{beer.name}</h2>
            <h2>{beer.price}</h2>
            <p>
  Rating: {beer.rating ? `${String(beer.rating.average).slice(0, 4)} ⭐ (${beer.rating.reviews} reviews)` : "No rating available"}
</p>


          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
