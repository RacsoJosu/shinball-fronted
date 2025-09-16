import RootLoader from "@/root-loader";
import { Button } from "@/shared/components/button";
import { ContentPage } from "@/shared/components/content-page";
import HeaderPage from "@/shared/components/header-page";
import { Pagination } from "@/shared/components/pagination";
import { Search } from "@/shared/components/search-input";
import { TableCustom } from "@/shared/components/table";
import { Title } from "@/shared/components/title";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Suspense } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink, useSearchParams } from "react-router";
import { getProductosQueryOptions } from "../hooks/productos.queries-options";
import { Property } from "../service/productos.service";
function Productos() {
  const [searchParams] = useSearchParams();
  const { data, isPending } = useQuery({
    ...getProductosQueryOptions(
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
          <Title title="Productos" />
          <Button type="button" className="max-w-[150px] p-0">
            <NavLink
              to={"/productos/agregar"}
              className="w-full flex justify-center items-center gap-2 p-2"
            >
              <span>Agregar</span>
              <MdAddShoppingCart className="text-white" />
            </NavLink>
          </Button>
        </div>
        <Search />
      </HeaderPage>

      <ContentPage className=" gap-2">
        {!isPending ? <Pagination totalPages={data?.totalPages ?? 0} /> : null}
        <Suspense fallback={<RootLoader />}>
          <TableWrapper />
        </Suspense>
      </ContentPage>
    </div>
  );
}

const columnHelper = createColumnHelper<Property>();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Id</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("description", {
    id: "description",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Descripcion</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.capacity, {
    id: "capacity",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Capacidad</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.type, {
    id: "type",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Tipo</span>,
    footer: (info) => info.column.id,
  }),
  // columnHelper.accessor((row) => , {
  //   id: "role",
  //   cell: (info) => <span>{info.getValue()}</span>,
  //   header: () => <span>role</span>,
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor((row) => row.role, {
  //   id: "accion",
  //   cell: (info) => <AccionTableUser idUser={info.cell.row.original.id}></AccionTableUser>,
  //   header: () => <span></span>,
  //   footer: (info) => info.column.id,
  // }),
];

// function AccionTableUser({ idUser }: { idUser: string }) {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <Button
//         onClick={() => {
//           navigate(`/usuarios/editar/${idUser}`);
//         }}
//       >
//         <FaEdit />
//       </Button>
//     </div>
//   );
// }

function TableWrapper() {
  const [searchParams] = useSearchParams();
  const { data } = useSuspenseQuery({
    ...getProductosQueryOptions(
      searchParams.get("search") ?? "",
      Number(searchParams.get("page")) || 1,
      10
    ),
    // select: (res) => res.data.data,
  });

  return <TableCustom data={data.data.data.properties} columns={columns} />;
}
export default Productos;
