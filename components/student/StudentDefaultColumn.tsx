import IndeterminateCheckbox from '@/components/common/IndeterminateCheckBox';
import ProfileComponent from '@/components/common/ProfileComponent';
import { Student } from '@/lib/types/student';
import { Teacher } from '@/lib/types/teacher';
import { DateFormat } from '@/utils/dateformat';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

export const StudentDefaultColumn: ColumnDef<Student>[] = [
    {
        meta: {
            headerClass: "custom_wth1",
        },
        enableSorting: false,
        accessorKey: "checkbox",
        id: "checkbox",
        header: ({ table }) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => (
            <IndeterminateCheckbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
    },
    {
        meta: {
            headerClass: "custom_pl0",
        },
        accessorKey: "profile_image",
        id: "nm",
        header: "Student Name",
        cell: (props) => (
            <div className="custom_pl0">
                <ProfileComponent name={props.row?.original?.name} image={props.row?.original?.profile_image} />
            </div>
        ),
    },
    {
        meta: {
            headerClass: "custom_wth170",
        },
        accessorKey: "phone_number",
        id: "phonenumber",
        header: "Phone Number",
        cell: (props) => props.getValue(),
        enableSorting: false,
    },
    {
        meta: {
            headerClass: "custom_wth100",
        },
        accessorKey: "gender",
        id: "gndr",
        header: "Gender",
        cell: (props) => props.getValue(),
    },
    {
        meta: {
            headerClass: "custom_wth150",
        },
        accessorKey: "email",
        id: "email",
        header: "Email",
        cell: (props) => props.getValue(),
    },
   
    {
        meta: {
            headerClass: "custom_wth130",
        },
        accessorKey: "address",
        id: "address",
        header: "Address",
        enableSorting: false,
        cell: (props) => props.getValue(),
    },
    {
        meta: {
            headerClass: "custom_wth130",
        },
        accessorKey: "created_at",
        id: "created_at",
        header: "Created At",
        enableSorting: false,
        cell: ({row}) => <span>{DateFormat(row?.original?.creaed_at)}</span>,
    },
];
