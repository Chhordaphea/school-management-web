import TableComponent from '@/components/common/TableComponent'
import React, { useState } from 'react'
import { StudentDefaultColumn } from './StudentDefaultColumn';
import useFetchStudent from '@/lib/hooks/use-fetch-student';
import { useResetRowSelectStore, useStudentStore } from '@/lib/store';
import CreateStudent from './CreateStudent';
import SearchInput from '@/components/common/SearchInput';
import useDeleteStudent from '@/lib/hooks/use-delete-student';
import PaginationComponent from '@/components/common/Pagination';


const StudentList = () => {
  const { studentQuery, isLoading, isError } = useFetchStudent();
  const { open, setOpen, isUpdate, setIsUpdate, updateData, setUpdateData } = useStudentStore(state => state);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const deleteStudent = useDeleteStudent();
  const {setRow,resetRow} = useResetRowSelectStore(state => state);

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
            <span className="custom_mr15">New Student</span>
          </button>
        </div>
      </div>
      <div className="custom_h100 custom_scrollable custom_d_flex custom_flex_col custom_mt20 custom_ml30 custom_mr30">
        <div className="custom_mtauto custom_h100 custom_scrollable custom_pos_rlt">
          <div className="custom_h100 custom_d_flex custom_flex_col">
            <div className="custom_h100 custom_tbl_wrapper custom_scrollable custom_mbauto">
              <TableComponent
                data={studentQuery?.data?.student_list!}
                defaultColumns={StudentDefaultColumn}
                checkSelected={(data) => {
                  setSelectedRows(data);
                }}
                total_page={studentQuery?.data?.pagination?.total_page} />
            </div>
            <PaginationComponent data={studentQuery?.data?.pagination} />

          </div>
        </div>
      </div>
      {
        open && (<CreateStudent />)
      }
    </>

  )
}

export default StudentList