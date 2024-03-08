import { flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const TableSkeleton = ({table}: any) => {
  return (
    <Table>
        <TableHeader>
        {
            table.getHeaderGroups().map((headergroup: any) => (
              <TableRow key={headergroup.id}>
                {
                  headergroup.headers.map((header: any) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))
                }
              </TableRow>
            ))
          }
        </TableHeader>
        <TableBody>
            {
        Array.from(Array(3).keys()).map((index) => (
            <TableRow key={index}>
               {
                Array.from(Array(5).keys()).map(index => (
                    <TableCell key={index} className="py-4">
                    <div className="skeleton h-4 w-full"></div>
                </TableCell>
                
                ))
               }
            </TableRow>

         ))
        }
       
        </TableBody>
        {/* <TableBody>
            <TableRow>
            {
        Array.from(Array(5).keys()).map((index) => (
                <TableCell key={index}>
                    <div className="skeleton h-4 w-full"></div>
                </TableCell>
         ))
        }
            </TableRow>
       
        </TableBody> */}
    </Table>
  );
};

export default TableSkeleton;
