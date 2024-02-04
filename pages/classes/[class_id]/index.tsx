import IndeterminateCheckbox from '@/components/common/IndeterminateCheckBox';
import PaginationComponent from '@/components/common/Pagination';
import ProfileComponent from '@/components/common/ProfileComponent';
import TableComponent from '@/components/common/TableComponent';
import { TeacherDefaultColumn } from '@/components/teacher/TeacherDefaultColumn';
import { Teacher } from '@/lib/types/teacher';
import classService from '@/service/class.service'
import { DateFormat } from '@/utils/dateformat';
import { useQueries, useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const defaultColumn: ColumnDef<Teacher>[] = [
    {
        accessorKey: "profile_image",
        id: "nm",
        header: "Name",
        cell: (props) => (
            <div >
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
        cell: ({ row }) => <span>{DateFormat(row?.original?.creaed_at)}</span>,
    },
];




const ClassInfo = () => {
    const router = useRouter();

    const { data: teacherClass, isError: er, isLoading: is } = useQuery(
        ['teacherClass'],
        async () => await classService.getTeacherClass(router?.query?.class_id));


    const { data: studentClass, isError: e, isLoading: l } = useQuery(
        ['studentClass'],
        async () => await classService.getStudentClass(router?.query?.class_id));

    const [showTeacher, setShowTeacher] = useState(true);
    const [showStudent, setShowStudent] = useState(false);

    if (er) {
        return <div></div>
    }
    if (is) {
        return <div></div>
    }
    if (e) {
        return <div></div>
    }
    if (l) {
        return <div></div>
    }

 

    const handleToggleTeacher = () => {
        setShowTeacher(!showTeacher);
        setShowStudent(false);
    }

    const handleToggleStudent = () => {
        setShowStudent(!showStudent);
        setShowTeacher(false);
    }




    return (
        <>
            <div className="custom_plr30">
                <div className="custom_row custom_mt20">
                    <div className="custom_col6">
                        <div className="custom_div_blk custom_d_flex custom_jt_cont_betw custom_alg_itm_start custom_sb_bg_clr custom_p25">
                            <div className="custom_d_flex custom_flex_col text_withe">
                                <label className="custom_lbl custom_fw_md">Total Teachers</label>
                                <label className="custom_lbl custom_fs24 custom_fw_semi_bd">{teacherClass?.teacher_lists?.length || 0}</label>
                            </div>
                        </div>
                    </div>
                    <div className="custom_col6">
                        <div className="custom_div_blk custom_d_flex custom_jt_cont_betw custom_alg_itm_start custom_sb_bg_clr custom_p25" >
                            <div className="custom_d_flex custom_flex_col text_withe">
                                <label className="custom_lbl custom_fw_md">Total Students</label>
                                <label className="custom_lbl custom_fs24 custom_fw_semi_bd">{studentClass?.student_list?.length || 0}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom_plr30">
                <div className="custom_row">
                    <div className="custom_col12">
                        <div className="custom_brd_btm custom_d_flex custom_alg_itm_ctr custom_mt20">
                            <div className="custom_pos_rlt" onClick={handleToggleTeacher}>
                                <div className={`custom_sb_itm ${showTeacher && "cur_act"} custom_d_flex  custom_alg_itm_ctr custom_ptb15_plr20`}>
                                    <label className="custom_lbl custom_fw_md custom_ml10" role='button'>Teachers</label>
                                </div>
                                <div className="custom_w100 custom_tab_itm_line" />
                            </div>
                            <div className="custom_pos_rlt custom_ml10" onClick={handleToggleStudent}>
                                <div className={`custom_sb_itm  ${showStudent && "cur_act"} custom_d_flex custom_alg_itm_ctr custom_ptb15_plr20 `}>
                                    <label className="custom_lbl custom_fw_md custom_sec_clr custom_ml10 " role='button'>
                                        Students
                                    </label>
                                </div>
                                <div className="custom_w100 custom_tab_itm_line" />
                            </div>
                        </div>
                    </div>
                </div>

                {
                    showTeacher &&
                    <div className="custom_h100 custom_scrollable custom_d_flex custom_flex_col custom_mt20 custom_ml30 custom_mr30">
                        <div className="custom_mtauto custom_h100 custom_scrollable custom_pos_rlt">
                            <div className="custom_h100 custom_d_flex custom_flex_col">
                                <div className="custom_h100 custom_tbl_wrapper custom_scrollable custom_mbauto">
                                    <TableComponent
                                        data={teacherClass?.teacher_lists!}
                                        defaultColumns={defaultColumn}

                                        total_page={teacherClass?.pagination?.total_page} />
                                </div>
                                {/* <PaginationComponent data={teacherClass?.pagination} /> */}
                            </div>
                        </div>
                    </div>
                }

                {
                    showStudent &&
                    <div className="custom_h100 custom_scrollable custom_d_flex custom_flex_col custom_mt20 custom_ml30 custom_mr30">
                        <div className="custom_mtauto custom_h100 custom_scrollable custom_pos_rlt">
                            <div className="custom_h100 custom_d_flex custom_flex_col">
                                <div className="custom_h100 custom_tbl_wrapper custom_scrollable custom_mbauto">
                                    <TableComponent
                                        data={studentClass?.student_list!}
                                        defaultColumns={defaultColumn}
                                        total_page={studentClass?.pagination?.total_page} />
                                </div>
                                {/* <PaginationComponent data={teacherClass?.pagination} /> */}
                            </div>
                        </div>
                    </div>
                }
            </div>


        </>
    )
}

export default ClassInfo