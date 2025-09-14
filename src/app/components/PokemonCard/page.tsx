import Link from "next/link";

interface Props {
  id: number;
  name: string;
  isGrid: boolean;
}

export function PokemonCard({ id, name, isGrid }: Props) {
  return (
    <Link href={`/detalhes/${id}`}>
      <div
        className={`border rounded-lg p-4 flex ${
          isGrid ? "flex-col items-center" : "flex-row items-center gap-4"
        } hover:shadow-lg transition`}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          className="w-20 h-20"
        />
        <div className="text-center sm:text-left">
          <p className="font-bold capitalize">{name}</p>
          <p className="text-gray-500">#{id.toString().padStart(3, "0")}</p>
        </div>
      </div>
    </Link>
  );
}
