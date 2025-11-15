import MovieRow from "@/components/MovieRow";
import Image from "next/image";



export default async function MoviesPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb`, {
        cache: "no-store",
    });

    const data = await res.json();
    const movies = data.results;

    return (
        <div className="px-4">
            {/* HERO */}
            {movies?.[1] && (
                <div className="relative h-[50vh] w-full mb-10">
                    <Image
                        src={
                            movies[1].backdrop_path
                                ? `https://image.tmdb.org/t/p/original${movies[1].backdrop_path}`
                                : "/fallback.jpg"
                        }
                        alt={movies[1].title}
                        fill
                        priority
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-6 left-6">
                        <h1 className="text-3xl font-bold">{movies[1].title}</h1>
                    </div>
                </div>
            )}

            <MovieRow movies={movies} categoryTitle="All Movies" />
        </div>
    );
}
