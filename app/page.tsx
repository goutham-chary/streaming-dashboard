import Image from "next/image";
import MovieRow from "@/components/MovieRow";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb`, {
    cache: "no-store",
  });

  const data = await res.json();
  const movies = data.results;

  return (
    <div>
      {/* HERO SECTION */}
      {movies?.[0] && (
        <div className="relative h-[80vh] w-full mb-8">
          <Image
            src={
              movies[0].backdrop_path
                ? `https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`
                : "/fallback.jpg"
            }
            alt={movies[0].title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute bottom-10 left-10">
            <h1 className="text-4xl font-bold">{movies[0].title}</h1>
          </div>
        </div>
      )}

      {/* ROWS */}
      <MovieRow movies={movies} categoryTitle="Popular Movies" />
      <MovieRow movies={[...movies].reverse()} categoryTitle="Top Picks For You" />
<MovieRow movies={movies.slice(0, 10)} categoryTitle="New Releases" />
    </div>
  );
}
