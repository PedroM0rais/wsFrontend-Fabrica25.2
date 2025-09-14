import axios from "axios";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function PokemonDetalhes({ params }: Props) {
  const { id } = params;
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = res.data;

  return (
    <main className="container">
      <header>
        <h1>Detalhes do Pokemon</h1>
        {/* Botão de Voltar */}
        <Link href="/" className="small" style={{ textDecoration: "underline" }}>
          ⬅ Voltar para Home
        </Link>
      </header>

      <div
        className="card text-center"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="poke-img"
        />
        <h2 className="card-name">{pokemon.name}</h2>
        <p className="muted">#{pokemon.id.toString().padStart(3, "0")}</p>

        <div style={{ marginTop: "16px" }}>
          <p>
            <strong>Tipo(s):</strong>{" "}
            {pokemon.types.map((t: any) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </p>
          <p>
            <strong>Experiência Base:</strong> {pokemon.base_experience}
          </p>
        </div>
      </div>

      <footer>
        <span className="small">Dados da PokeAPI</span>
      </footer>
    </main>
  );
}
