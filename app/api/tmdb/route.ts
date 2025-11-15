import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing TMDB API key" }), {
        status: 500,
      });
    }

    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    const res = await axios.get(url);

    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
