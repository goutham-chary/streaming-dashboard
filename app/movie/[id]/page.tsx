import Image from "next/image";

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;  // 🟢 THIS IS THE FIX

    const apiKey = process.env.TMDB_API_KEY;

    const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
        { cache: "no-store" }
    );

    const movie = await movieRes.json();

    if (!movie || movie.success === false) {
        return (
            <div className="p-6 text-center text-red-500 text-xl">
                ❌ Failed to load movie details. Invalid API key or ID.
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="grid md:grid-cols-2 gap-10">

                <div className="relative w-full h-[500px]">
                    <Image
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                : "/fallback.jpg"
                        }
                        alt={movie.title || "Movie poster"}
                        fill
                        className="object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-gray-300 mb-4">{movie.overview}</p>

                    <p className="text-lg">
                        ⭐ Rating: <span className="font-semibold">{movie.vote_average}</span>
                    </p>

                    <p className="mt-2">
                        🗓️ Release Date:{" "}
                        <span className="font-semibold">{movie.release_date}</span>
                    </p>
                </div>

            </div>
        </div>
    );
}
