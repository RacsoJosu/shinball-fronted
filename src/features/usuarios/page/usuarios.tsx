import HeaderPage from "../components/header-page";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Title } from "@/shared/components/title";
import { Button } from "@/shared/components/button";
import { Search } from "@/shared/components/search-input";
import { NavLink, useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUsersQueryOptions } from "../hooks/users-queries";
import { TableCustom } from "../components/table-users";
import { PropsWithChildren, Suspense } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { UserType } from "../types/users-types";
import { cn } from "@/lib/utils";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";

function Usuarios() {
  const [searchParams, _] = useSearchParams();
  const { data } = useSuspenseQuery({
    ...useUsersQueryOptions(
      searchParams.get("search") || "",
      Number(searchParams.get("page")) || 1,
      10
    ),
    select: (res) => res.data.data,
  });

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

      <ContentPage className=" gap-12">
        <Pagination totalPages={data.totalPages} />
        <Suspense
          fallback={
            <div className="h-full flex flex-col items-center justify-center w-full">
              <p>Cargando ...</p>{" "}
            </div>
          }
        >
          <TableWrapper />
        </Suspense>
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
    header: () => <span>Role</span>,
    footer: (info) => info.column.id,
  }),
];

function TableWrapper() {
  const [searchParams, _] = useSearchParams();
  const { data } = useSuspenseQuery({
    ...useUsersQueryOptions(
      searchParams.get("search") || "",
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
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) {
  return (
    <div
      className={cn("flex flex-col gap-4 flex-1 px-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function Pagination({ totalPages }: { totalPages: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="h-2">
      <div className="flex items-center gap-2">
        <button className="border rounded p-1">{"<<"}</button>
        <Button
          className="size-auto rounded-full bg-white mt-0 p-0"
          onClick={() => {
            const lastPage = Math.max(
              parseInt(searchParams.get("page") || "1", 10) - 1,
              1
            );

            console.log({ searchParams });
            setSearchParams((prev) => ({ ...prev, page: lastPage.toString() }));
          }}
          disabled={Math.max(Number(searchParams.get("page")), 1) === 1}
          type="button"
        >
          <IoArrowBackCircleSharp className="text-primary-400 hover:text-white bg-transparent rounded-full size-6" />
        </Button>

        <Button
          className="size-auto rounded-full bg-white mt-0 p-0"
          onClick={() => {
            const nextPage = parseInt(searchParams.get("page") || "1", 10) + 1;
            console.log({ searchParams });
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("page", nextPage.toString() );
              return params;
            });
            // setSearchParams((prev) => ({ ...prev, page: nextPage.toString() }));
          }}
          disabled={
            Math.max(Number(searchParams.get("page")), 1) === totalPages
          }
          type="button"
        >
          <IoArrowForwardCircleSharp className="text-primary-400 hover:text-white bg-transparent rounded-full size-6" />
        </Button>
        <button
          className="border rounded p-1"
          // onClick={() => table.lastPage()}
          // disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {Math.max(Number(searchParams.get("page")), 1)} of {totalPages}
          </strong>
        </span>
        {/* <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                min="1"
                // max={table.getPageCount()}
                // defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  // const page = e.target.value ? Number(e.target.value) - 1 : 0
                  // table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
            // value={table.getState().pagination.pageSize}
            // onChange={e => {
            //   table.setPageSize(Number(e.target.value))
            // }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select> */}
      </div>
      <div>
        {/* Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {table.getRowCount().toLocaleString()} Rows */}
      </div>
    </div>
  );
}
export default Usuarios;
