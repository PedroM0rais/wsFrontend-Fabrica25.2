"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {Footer} from "./components/Footer/page";
import {Header} from "./components/Header/page";

interface Pokemon {
  name: string;
  url: string;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [isGrid, setIsGrid] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
      setPokemons(res.data.results);
    };
    fetchPokemons();
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container">
      <Header>
        <div className="searchbar" role="search">
          <input
            type="text"
            placeholder="Buscar Pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setIsGrid(!isGrid)}>
            {isGrid ? "Ver em Lista" : "Ver em Grade"}
          </button>
        </div>
      </Header>
      {filtered.length === 0 ? (
        <div className="no-results">Nenhum Pokemon encontrado</div>
      ) : (
        <div className={isGrid ? "grid" : "flex-col"}>
          {filtered.map((pokemon, index) => {
            const id = index + 1;
            return (
              <Link className="btnLink" key={id} href={`/details/${id}`}>
                <div className="card">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={pokemon.name}
                    className="poke-img"
                  />
                  <p className="card-name">{pokemon.name}</p>
                  <p className="muted idtag">#{id.toString().padStart(3, "0")}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
        <Footer />
    </main>
  );
}
