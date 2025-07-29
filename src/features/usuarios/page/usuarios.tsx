import { Button } from "@/shared/components/button";
import { ContentPage } from "@/shared/components/content-page";
import { Pagination } from "@/shared/components/pagination";
import { Search } from "@/shared/components/search-input";
import { Title } from "@/shared/components/title";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import HeaderPage from "../../../shared/components/header-page";
import { TableCustom } from "../../../shared/components/table";
import { useUsersQueryOptions } from "../hooks/users-queries";
import { UserType } from "../types/users-types";
function Usuarios() {
  const [searchParams] = useSearchParams();
  const { data, isPending } = useQuery({
    ...useUsersQueryOptions(
      searchParams.get("search") ?? "",
      Number(searchParams.get("page")) || 1,
      10
    ),
    select: (res) => res.data.data,
  });
  return (
    <div className="flex flex-col flex-wrap gap-8 ">
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

      <ContentPage className=" gap-2">
        {!isPending ? <Pagination totalPages={data?.totalPages ?? 0} /> : null}
        <TableWrapper />
      </ContentPage>
    </div>
  );
}

const columnHelper = createColumnHelper<UserType>();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Id</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("firstName", {
    id: "firstName",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Nombres</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Apellidos</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.email, {
    id: "email",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>email</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.role, {
    id: "role",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>role</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.role, {
    id: "accion",
    cell: (info) => <AccionTableUser idUser={info.cell.row.original.id}></AccionTableUser>,
    header: () => <span></span>,
    footer: (info) => info.column.id,
  }),
];

function AccionTableUser({ idUser }: { idUser: string }) {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          navigate(`/usuarios/editar/${idUser}`);
        }}
      >
        <FaEdit />
      </Button>
    </div>
  );
}

function TableWrapper() {
  const [searchParams] = useSearchParams();
  const { data } = useSuspenseQuery({
    ...useUsersQueryOptions(
      searchParams.get("search") ?? "",
      Number(searchParams.get("page")) || 1,
      10
    ),
    select: (res) => res.data.data,
  });

  return <TableCustom data={data.users} columns={columns} />;
}

export default Usuarios;
