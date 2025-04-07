import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useReactTable, createColumnHelper , getCoreRowModel, flexRender} from '@tanstack/react-table'
import { UserType } from "../types/users-types"
// import { useId } from "react"

const columnHelper = createColumnHelper<UserType>()

const columns = [
  columnHelper.accessor('id', {
    id: 'id',
    cell: info => <span className="text-normal ">{info.getValue()}</span>,
    header: () => <span className="font-bold text-lg text-primary-500">Id</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('firstName', {
    id: 'firstName',
    cell: info => <span className="text-normal ">{info.getValue()}</span>,
    header: () => <span className="font-bold text-lg text-primary-500">Nombres</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => <span className="text-normal ">{info.getValue()}</span>,
    header: () => <span className="font-bold text-lg text-primary-500">Apellidos</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.email, {
    id: 'email',
    cell: info => <span className="text-normal ">{info.getValue()}</span>,
    header: () => <span className="font-bold text-lg text-primary-500">email</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.role, {
    id: 'role',
    cell: info => <span className="text-normal ">{info.getValue()}</span>,
    header: () => <span className="font-bold text-lg text-primary-500">Role</span>,
    footer: info => info.column.id,
  }),
]
export function TableCustom({data}: {data:UserType[]}) {
  const table = useReactTable({
    columns: columns,
    data,
    getCoreRowModel: getCoreRowModel()

  })


  return (
    <Table>
      <TableCaption>A list of your recent users.</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup, index) => (

          <TableRow className="p-8" key={index.toString()}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
          </TableRow>
          ))}
      </TableHeader>
      <TableBody>
         {table.getRowModel().rows.map(row => (
            <TableRow className="size-16" key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}

      </TableBody>
    </Table>
  )
}
