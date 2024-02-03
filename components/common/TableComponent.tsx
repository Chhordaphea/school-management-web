import dynamic from "next/dynamic";
import {
    ColumnDef,
    ColumnOrderState, flexRender,
    getCoreRowModel, OnChangeFn,
    Row,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import cn from "clsx";
import { useResetRowSelectStore } from "@/lib/store";

type Props = {
    checkSelected?: (data: any) => void,
    data: any | undefined,
    defaultColumns: ColumnDef<any>[],
    total_page: number | undefined,
    handleRowClick?: (row: any) => void;
    resetSelectRow?: boolean,
    rowActions?: (data: Row<any>) => React.ReactNode
}

const TableComponent: React.FC<Props>
    = ({
        checkSelected,
        data,
        defaultColumns,
        total_page,
        handleRowClick,
        resetSelectRow = false,
        rowActions
    }) => {

        const [columns] = useState<typeof defaultColumns>([...defaultColumns])
        const {setRow,resetRow} = useResetRowSelectStore(state => state);

        const table = useReactTable({
            data: data,
            columns,
            pageCount: total_page ?? -1,
            state: {
                // pagination,
                // sorting,
                // columnVisibility,
                // columnOrder,
                // rowSelection
            },
            // onSortingChange: onSortingChange,
            getCoreRowModel: getCoreRowModel(),
            enableRowSelection: true,
            manualPagination: true,
            enableMultiSort: true,
            enableSortingRemoval: false,
        })

        useEffect(() => {
            if (resetSelectRow)
                table.resetRowSelection();
        }, [resetSelectRow, table])

        useEffect(() => {
            if (checkSelected)
                checkSelected(table.getSelectedRowModel().flatRows)
        }, [table.getSelectedRowModel().rows.length])

        useEffect(() => {
            table.resetRowSelection();
           resetRow(false)
        }, [setRow == true])


        return (
            <table className="custom_w100" style={{ width: '100%' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    className={cn("custom_tbl_hd", (header.column.columnDef.meta as any)?.headerClass)}
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    style={{ textAlign: (header.column.columnDef.meta as any)?.align }}
                                >
                                    {
                                        header.isPlaceholder
                                            ? null
                                            : <div {...{

                                                className: cn('', {
                                                    'cursor-pointer select-none': header.column.getCanSort(),
                                                }),
                                                // onClick: header.column.getToggleSortingHandler()
                                                onClick: (e) => {
                                                    if (header.column.getCanSort()) {
                                                        header.column.toggleSorting(
                                                            header.column.getIsSorted() === "asc",
                                                            e.shiftKey
                                                        )
                                                    }
                                                }
                                            }}>
                                                {
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                                {/* {header.column.getIsSorted() == "asc" && <ArrowUp />}
                                                {header.column.getIsSorted() == "desc" && <ArrowDown />}
                                                {header.column.getCanSort() && !header.column.getIsSorted() && <ArrowDown />} */}


                                                {/*{{*/}
                                                {/*    asc: <ArrowUp />,*/}
                                                {/*    desc: <ArrowDown />,*/}
                                                {/*}[header.column.getIsSorted() as string] ?? null }*/}
                                                {/*{*/}
                                                {/*    header.column.getCanSort() && !header.column.getIsSorted() && <ArrowDown />*/}
                                                {/*}*/}
                                            </div>
                                    }

                                </th>
                            ))}
                             <th className="custom_tbl_hd custom_wth1"></th>
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.length == 0
                            ?
                            <tr className="custom_brd_top custom_tbl_data_row" style={{ textAlign: "center" }}>
                                <td className="custom_tbl_data" colSpan={table.getVisibleFlatColumns().length}>No Data</td>
                            </tr>
                            :
                            table.getRowModel().rows.map(row => (
                                <tr className={"cursor-pointer custom_brd_top custom_tbl_data_row"} key={row.id} onClick={() => {
                                    if (handleRowClick) {
                                        handleRowClick(row.original)
                                    }
                                }}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            className={"custom_tbl_data"}
                                            align={(cell.column.columnDef.meta as any)?.align}
                                            key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    <td className={"editable"}>
                                        {flexRender(rowActions, row)}
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        );
    }

export default TableComponent;