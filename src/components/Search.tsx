import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const genre = searchParams.getAll("genre") ?? [];

  const [searchInput, setSearchInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const [limitSelect, setLimitSelect] = useState<string>("5");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimitSelect(e.target.value);
  };

  return (
    <>
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
              genre: genre,
            })
          }
        >
          <CiSearch size={20} />
        </button>
      </div>
    </>
  );
};
