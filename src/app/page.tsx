"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

interface Pokemon {
  name: string;
  url: string;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [isGrid, setIsGrid] = useState(true);

  // Busca os 151 primeiros Pokémons
  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
      setPokemons(res.data.results);
    };
    fetchPokemons();
  }, []);

  // Filtra os Pokémons pelo nome
  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Extrai o ID real do Pokémon a partir da URL
  const getPokemonId = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    return Number(id); // garante que seja número
  };

  // Capitaliza o nome
  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

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
        <div className="no-results">Nenhum Pokémon encontrado</div>
      ) : (
        <div className={isGrid ? "grid" : "flex-col"}>
          {filtered.map((pokemon) => {
            const id = getPokemonId(pokemon.url);

            return (
              <Link className="btnLink" key={id} href={`/details/${id}`}>
                <div className="card">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={pokemon.name}
                    className="poke-img"
                  />
                  <p className="card-name">{formatName(pokemon.name)}</p>
                  <p className="muted idtag">#{String(id).padStart(3, "0")}</p>
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
