"use client";

import Image from "next/image";
import Link from "next/link";

export default function MovieRow({ movies, categoryTitle }) {
    return (
        <section className="mb-8 px-4">
            <h2 className="text-2xl font-semibold mb-3">{categoryTitle}</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-none">
                {movies?.map((movie) => (
                    <Link
                        key={movie.id}
                        href={`/movie/${movie.id}`}
                        className="min-w-[150px] relative"
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={150}
                            height={225}
                            className="rounded-md hover:scale-105 transition"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}
