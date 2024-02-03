import TableComponent from '@/components/common/TableComponent'
import useFetchTeacher from '@/lib/hooks/use-fetch-teacher';
import React, { useState } from 'react'
import { TeacherDefaultColumn } from './TeacherDefaultColumn';
import { useResetRowSelectStore, useTeacherStore } from '@/lib/store';
import CreateTeacher from './CreateTeacher';
import SearchInput from '@/components/common/SearchInput';
import useDeleteTeacher from '@/lib/hooks/use-delete-teacher';
import PaginationComponent from '@/components/common/Pagination';

const TeacherList = () => {
  const { teacherQuery, isLoading, isError } = useFetchTeacher();
  const { open, setOpen, isUpdate, setIsUpdate, updateData, setUpdateData } = useTeacherStore(state => state);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const deleteTeacher = useDeleteTeacher();
  const { setRow, resetRow } = useResetRowSelectStore(state => state);



  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

  const handleDeleteStudent = () => {
    if (!confirm("Are you sure you want to delete this teacher?")) {
      return;
    }
    var teacherIds = selectedRows?.map((item: any) => {
      return item?.original?.id;
    })
    deleteTeacher.mutation(teacherIds);

  }

  return (
    <>
      <div className="custom_plr30 custom_mt25">
        <div className="custom_mt20 custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr">
          <div className="custom_d_flex custom_alg_itm_ctr">
            <SearchInput />

            {
              selectedRows.length == 1 &&
              <button onClick={() => {
                setIsUpdate(true);
                setOpen(true);
                setUpdateData(selectedRows[0]?.original);
              }} type="button" className="custom_btn custom_btn_outline custom_d_flex custom_alg_itm_ctr custom_mr10" >
                <span className="custom_ml5">Edit</span>
              </button>

            }
            {
              selectedRows.length > 0 &&
              <button onClick={handleDeleteStudent} type="button" className="custom_btn custom_btn_dg_outline custom_d_flex custom_alg_itm_ctr custom_mr10 "  >
                <span className="custom_ml5">Delete</span>
              </button>
            }
          </div>
          <button className="custom_btn custom_btn_pm" onClick={() => {
            setOpen(true)
            setIsUpdate(false);
            setUpdateData("");
            }}>
            <span className="custom_mr15">New Teacher</span>
          </button>
        </div>
      </div>
      <div className="custom_h100 custom_scrollable custom_d_flex custom_flex_col custom_mt20 custom_ml30 custom_mr30">
        <div className="custom_mtauto custom_h100 custom_scrollable custom_pos_rlt">
          <div className="custom_h100 custom_d_flex custom_flex_col">
            <div className="custom_h100 custom_tbl_wrapper custom_scrollable custom_mbauto">
              <TableComponent
                data={teacherQuery?.data?.teacher_lists!}
                defaultColumns={TeacherDefaultColumn}
                checkSelected={(data) => {
                  setSelectedRows(data);
                }}
                total_page={teacherQuery?.data?.pagination?.total_page} />
            </div>
            <PaginationComponent data={teacherQuery?.data?.pagination} />
          </div>
        </div>
      </div>
      {
        open && (<CreateTeacher />)
      }
    </>

  )
}

export default TeacherList