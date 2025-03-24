import HeaderPage from "../components/header-page";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Title } from "@/shared/components/title";
import { Button } from "@/shared/components/button";
import { Search } from "@/shared/components/search-input";
import { NavLink, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUsersQueryOptions } from "../hooks/users-queries";

function Usuarios() {
  const [searchParams, _] = useSearchParams()
  const { data } = useQuery({...useUsersQueryOptions(searchParams.get("search")), enabled: !!searchParams.get("search")})
  console.log({data})
  return (
    <div className="flex flex-col flex-wrap mt-4 ">
      <HeaderPage>
        <div className="flex justify-between items-center ">
          <Title title="Usuarios" />
          <Button type="button" className="max-w-[150px] p-0">
            <NavLink
              to={"/usuarios/agregar"}
              className="w-full flex justify-center items-center gap-2 p-2"
            >
              <span>Agregar</span>
              <BsFillPersonPlusFill className="text-white" />
            </NavLink>
          </Button>
        </div>
        <Search />
      </HeaderPage>
    </div>
  );
}

export default Usuarios;
