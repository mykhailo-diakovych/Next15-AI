"use client";

import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

interface DataTablePaginationProps<TData> {
   table: Table<TData>;
   pageInput: string;
   setPageInput: (page: string) => void;
   className?: string;
}

export function DataTablePagination<TData>({
   table,
   pageInput,
   setPageInput,
   className,
}: DataTablePaginationProps<TData>) {
   useEffect(() => {
      setPageInput(String(table.getState().pagination.pageIndex + 1));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [table, table.getState().pagination.pageIndex]);

   const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPageInput(value);
   };

   const handlePageInputSubmit = () => {
      const pageNumber = parseInt(pageInput, 10);
      if (
         !isNaN(pageNumber) &&
         pageNumber > 0 &&
         pageNumber <= table.getPageCount()
      ) {
         table.setPageIndex(pageNumber - 1);
      }
   };

   return (
      <div
         className={`flex items-center justify-center gap-2 py-5 ${className}`}
      >
         <div className="flex w-44 items-center rounded bg-white-smoke">
            <Button
               variant="ghost"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 text-center text-base">
               <Input
                  type="number"
                  min="1"
                  max={table.getPageCount()}
                  value={pageInput}
                  onChange={handlePageInputChange}
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        handlePageInputSubmit();
                     }
                  }}
                  className="mx-1 h-8 w-12 p-1 text-center"
               />
               <span className="text-old-silver">
                  of {table.getPageCount()}
               </span>
            </div>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               <ChevronRight className="h-4 w-4" />
            </Button>
         </div>
      </div>
   );
}
