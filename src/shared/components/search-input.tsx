import { useEffect, useState } from "react";
import Input from "./input";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDebounce } from "../hooks/use-debounced";


export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") ?? ""
  );
  const debouncedValue = useDebounce({ value: inputValue, delay: 300 });

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("search")
        params.set("page", "1")
        return params;
      });
    } else {
      navigate({
        pathname: location.pathname,

        search: createSearchParams({
          search: debouncedValue,
          page: "1",
        }).toString(),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  return (
    <Input
      type="text"
      placeholder="Busca un usuario"
      className="bg-white text-gray-800 w-full"
      value={inputValue}
      onChange={(event) => {
        event.preventDefault();
        setInputValue(event.target.value);
      }}
    />
  );
}
