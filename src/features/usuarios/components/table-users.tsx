import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useReactTable , getCoreRowModel, flexRender, ColumnDef} from '@tanstack/react-table'


type CustomTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[]
}
export function TableCustom<T>({data, columns}: CustomTableProps<T>) {
  const table = useReactTable({
    columns: columns,
    initialState: {
      columnVisibility: {
        id: false,
      }
    },
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
                <TableHead className="font-bold text-lg text-primary-500" key={header.id}>
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
                <TableCell className="text-normal" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}

      </TableBody>
    </Table>
  )
}
