"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md p-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-red-500">
                Streaming<span className="text-white">Hub</span>
            </Link>

            <nav className="flex gap-6 text-white">
                <Link href="/">Home</Link>
                <Link href="/movies">Movies</Link>
                <Link href="/series">Series</Link>
            </nav>
        </header>
    );
}
