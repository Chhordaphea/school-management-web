import TableComponent from '@/components/common/TableComponent'
import React, { useState } from 'react'
import useFetchStudent from '@/lib/hooks/use-fetch-student';
import { useClassStore, useResetRowSelectStore } from '@/lib/store';
import SearchInput from '@/components/common/SearchInput';
import useDeleteStudent from '@/lib/hooks/use-delete-student';
import PaginationComponent from '@/components/common/Pagination';
import IndeterminateCheckbox from '@/components/common/IndeterminateCheckBox';
import ProfileComponent from '@/components/common/ProfileComponent';
import { Student } from '@/lib/types/student';
import { Teacher } from '@/lib/types/teacher';
import { DateFormat } from '@/utils/dateformat';
import { ColumnDef } from '@tanstack/react-table';
import ClassPopup from './ClassPopup';
import useFetchClass from '@/lib/hooks/use-fetch-class';
import { Class } from '@/lib/types/class';
import { useRouter } from 'next/router';

export const defaultColumn: ColumnDef<Class>[] = [
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
    accessorKey: "name",
    id: "name",
    header: "Name",
    cell: (props) => props.getValue()
  },
  {
    meta: {
      headerClass: "custom_wth130",
    },
    accessorKey: "created_at",
    id: "created_at",
    header: "Created At",
    enableSorting: false,
    cell: ({ row }) => <span>{DateFormat(row?.original?.creaed_at)}</span>,
  },
];



const ClassList = () => {
  const { classQuery, isLoading, isError } = useFetchClass();
  const { open, setOpen, isUpdate, setIsUpdate, updateData, setUpdateData } = useClassStore(state => state);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const deleteStudent = useDeleteStudent();
  const { setRow, resetRow } = useResetRowSelectStore(state => state);
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

  const handleDeleteStudent = () => {
    if (!confirm("Are you sure you want to delete this student?")) {
      return;
    }
    var studentIds = selectedRows?.map((item: any) => {
      return item?.original?.id;
    })
    deleteStudent.mutation(studentIds);

  }


  return (
    <>
      <div className="custom_plr30 custom_mt25">
        <div className="custom_mt20 custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr">
          <div className="custom_d_flex custom_alg_itm_ctr">
            <SearchInput />
          </div>
          <button className="custom_btn custom_btn_pm" onClick={() => {
            setOpen(true)
            setIsUpdate(false);
            setUpdateData("");
          }}>
            <span className="custom_mr15">New Class</span>
          </button>
        </div>
      </div>
      <div className="custom_h100 custom_scrollable custom_d_flex custom_flex_col custom_mt20 custom_ml30 custom_mr30">
        <div className="custom_mtauto custom_h100 custom_scrollable custom_pos_rlt">
          <div className="custom_h100 custom_d_flex custom_flex_col">
            <div className="custom_h100 custom_tbl_wrapper custom_scrollable custom_mbauto">
              <TableComponent
                data={classQuery?.data?.class_lists!}
                defaultColumns={defaultColumn}
                checkSelected={(data) => {
                  setSelectedRows(data);
                }}
                handleRowClick={(data) => {
                  router.push(`classes/${data?.id}`);
                }}
                total_page={classQuery?.data?.pagination?.total_page} />
            </div>
            <PaginationComponent data={classQuery?.data?.pagination} />

          </div>
        </div>
      </div>
      {
        open && <ClassPopup />

      }
    </>

  )
}

export default ClassList