import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  actions?: (item: T) => React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  searchPlaceholder = "Search...",
  onSearch,
  actions,
}: DataTableProps<T>) {
  const [localSearch, setLocalSearch] = useState("");
  const filteredData = useMemo(() => {
    if (onSearch) return data;
    const query = localSearch.trim().toLowerCase();
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item as Record<string, unknown>).some((value) =>
        String(value ?? "").toLowerCase().includes(query),
      ),
    );
  }, [data, localSearch, onSearch]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-8"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              onSearch?.(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, i) => (
                <TableHead key={i}>{col.header}</TableHead>
              ))}
              {actions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2">Loading data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, i) => (
                <TableRow key={(item as any).id ?? i}>
                  {columns.map((col, j) => (
                    <TableCell key={j}>
                      {col.cell ? col.cell(item) : (item as any)[col.accessorKey]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="text-right">
                      {actions(item)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
