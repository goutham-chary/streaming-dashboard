import Image from "next/image";

interface TVShow {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path?: string | null;
}


export default async function SeriesPage() {
    const apiKey = process.env.TMDB_API_KEY;

    const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`,
        { cache: "no-store" }
    );
    const data = await res.json();
    const shows: TVShow[] = data.results;

    return (
        <div className="px-4">
            {/* HERO */}
            {shows?.[0] && (
                <div className="relative h-[50vh] w-full mb-10">
                    <Image
                        src={
                            shows[0].backdrop_path
                                ? `https://image.tmdb.org/t/p/original${shows[0].backdrop_path}`
                                : "/fallback.jpg"
                        }
                        alt={shows[0].name}
                        fill
                        priority
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-6 left-6">
                        <h1 className="text-3xl font-bold">{shows[0].name}</h1>
                    </div>
                </div>
            )}

            <h2 className="text-2xl mb-4 font-bold">Popular TV Series</h2>
            <div className="flex gap-4 overflow-x-auto">
                {shows.map((show) => (
                    <div key={show.id} className="min-w-[150px] relative">
                        <Image
                            src={
                                show.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                    : "/fallback.jpg"
                            }
                            alt={show.name}
                            width={150}
                            height={225}
                            className="rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
