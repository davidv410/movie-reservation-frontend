import { useMovies } from "@/features/movies/hooks/useMovies.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import { useGenres } from "@/features/movies/hooks/useGenres.ts";
import { Header } from "@/components/Header";
import { CiSearch } from "react-icons/ci";
import { transformMinutes } from "@/utils/transformMinutes";

export const Movies = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "5";
  const search = searchParams.get("search") ?? "";
  const genre = searchParams.getAll("genre") ?? [];

  const [searchInput, setSearchInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const [limitSelect, setLimitSelect] = useState<string>("5");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimitSelect(e.target.value);
  };

  const [genresArr, setGenresArr] = useState<string[]>([]);

  const addGenres = (id: string) => {
    if (genresArr.includes(id)) {
      setGenresArr((prev) => prev.filter((g) => g !== id));
    } else {
      setGenresArr((prev) => [...prev, id]);
    }
  };

  const { data, isLoading, error } = useMovies(page, limit, search, genre);
  const { data: genresList } = useGenres();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Header />
      <section>
        <div className="">
          <input
            className="border rounded-l-xl pl-1"
            placeholder="search..."
            onChange={handleInput}
            value={searchInput}
          ></input>
          <select
            className="border w-10 cursor-pointer"
            value={limitSelect}
            onChange={handleSelect}
          >
            <option disabled={true}>Change limit</option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
          <button
            className="cursor-pointer ml-5 mb-5"
            onClick={() =>
              setSearchParams({
                page: "1",
                limit: limitSelect,
                search: searchInput,
                genre: genresArr,
              })
            }
          >
            <CiSearch size={20} />
          </button>
          <div>
            {(genresList ?? []).map((g) => (
              <button
                className={`border mr-1 cursor-pointer rounded-xl pl-1.5 pr-1.5 ${genresArr.includes(g.id) ? "text-red-500" : ""}`}
                onClick={() => addGenres(g.id)}
              >
                {g.slug}
              </button>
            ))}
            <button
              className="border cursor-pointer text-green-500"
              onClick={() =>
                setSearchParams({
                  page: "1",
                  limit: limitSelect,
                  search: searchInput,
                  genre: genresArr,
                })
              }
            >
              APPLY FILTER
            </button>
          </div>
        </div>

        <div className="flex flex-wrap w-full justify-center">
          {(data?.movies ?? []).map((movie) => (
            <div
              key={movie.id}
              className="
                    m-10
                    p-2
                    border
                    w-80
                    "
            >
              <div className="w-100% h-50 bg-amber-400"></div>
              <p>{movie.title}</p>
              <div className="flex justify-between mt-3 mb-3 flex-col">
                <p>{transformMinutes(movie.durationMinutes)}</p>
                <button
                  className="cursor-pointer border"
                  onClick={() => navigate(`/movies/${movie.id}`)}
                >
                  WATCH
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          {(data?.pages ?? []).map((p) => (
            <ul>
              <li
                className="m-3 cursor-pointer w-2"
                onClick={() =>
                  setSearchParams({
                    page: String(p),
                    limit: limitSelect,
                    search: searchInput,
                    genre: genresArr,
                  })
                }
              >
                {p}
              </li>
            </ul>
          ))}
        </div>
      </section>
    </>
  );
};