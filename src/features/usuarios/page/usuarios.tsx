import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import { Search } from "@/shared/components/search-input";
import { Title } from "@/shared/components/title";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import {
  LucideArrowLeft,
  LucideArrowLeftToLine,
  LucideArrowRight,
  LucideArrowRightToLine,
} from "lucide-react";
import { PropsWithChildren } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import HeaderPage from "../components/header-page";
import { TableCustom } from "../components/table-users";
import { useUsersQueryOptions } from "../hooks/users-queries";
import { UserType } from "../types/users-types";
function Usuarios() {
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
        <Pagination />
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

function ContentPage({
  children,
  className,
  ...props
}: PropsWithChildren &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-4 flex-1 ", className)} {...props}>
      {children}
    </div>
  );
}

function Pagination({ totalPages }: Readonly<{ totalPages?: number }>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useSuspenseQuery({
    ...useUsersQueryOptions(
      searchParams.get("search") ?? "",
      Number(searchParams.get("page")) || 1,
      10
    ),
    select: (res) => res.data.data,
  });
  return (
    <div className="flex items-center gap-2">
      <Button
        className="size-auto rounded-full bg-primary-400 mt-0 p-1"
        onClick={() => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", "1");

            return params;
          });
        }}
        disabled={Math.max(Number(searchParams.get("page")), 1) === 1}
        type="button"
      >
        <LucideArrowLeftToLine className="text-white hover:text-white bg-transparent rounded-full size-4" />
      </Button>
      <Button
        className="size-auto rounded-full bg-primary-400 mt-0 p-1"
        onClick={() => {
          const lastPage = Math.max(parseInt(searchParams.get("page") ?? "1", 10) - 1, 1);

          setSearchParams((prev) => ({ ...prev, page: lastPage.toString() }));
        }}
        disabled={Math.max(Number(searchParams.get("page")), 1) === 1}
        type="button"
      >
        <LucideArrowLeft className="text-white hover:text-white bg-transparent rounded-full size-4" />
      </Button>

      <Button
        className="size-auto rounded-full bg-primary-400 mt-0 p-1"
        onClick={() => {
          const nextPage = parseInt(searchParams.get("page") ?? "1", 10) + 1;

          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", nextPage.toString());
            return params;
          });
        }}
        disabled={Math.max(Number(searchParams.get("page")), 1) === (totalPages ?? data.totalPages)}
        type="button"
      >
        <LucideArrowRight className="text-white hover:text-white bg-transparent rounded-full size-4" />
      </Button>
      <Button
        className="size-auto rounded-full bg-primary-400 mt-0 p-1"
        onClick={() => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", totalPages?.toString() ?? data?.totalPages.toString());

            return params;
          });
        }}
        disabled={Math.max(Number(searchParams.get("page")), 1) === (totalPages ?? data.totalPages)}
        type="button"
      >
        <LucideArrowRightToLine className="text-white hover:text-white bg-transparent rounded-full size-4" />
      </Button>

      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {Math.max(Number(searchParams.get("page")), 1)} of {totalPages ?? data.totalPages}
        </strong>
      </span>
    </div>
  );
}
export default Usuarios;
