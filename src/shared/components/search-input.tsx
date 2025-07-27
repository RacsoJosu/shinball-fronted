import { useState } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router";
import { useDebounceCallback } from "../hooks/use-debounced";
import Input from "./input";

export function Search({ placeholder = "Busca un usuario" }: { placeholder?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");

  function search(text: string) {
    console.log(text);
    if (text.trim() === "") {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("search");
        params.set("page", "1");
        return params;
      });
    } else {
      navigate({
        pathname: location.pathname,

        search: createSearchParams({
          search: text,
          page: "1",
        }).toString(),
      });
    }
  }
  const debounceCallback = useDebounceCallback(search, 500);
  return (
    <Input
      type="text"
      placeholder={placeholder}
      className="bg-white text-gray-800 w-full"
      value={searchValue}
      onChange={(event) => {
        const value = event.target.value;
        event.preventDefault();
        debounceCallback(value);
        setSearchValue(value);
      }}
    />
  );
}
