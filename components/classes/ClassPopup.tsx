import CameraSvg from '@/components/icon/CameraSvg';
import { useClassStore, useResetRowSelectStore, useTeacherStore } from '@/lib/store';
import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, } from 'react-hook-form';
import * as Yup from 'yup';
import Image from 'next/image';
import avatar from 'public/asset/user/avatar.svg'

import ClickOutside from '../../lib/click-outside/click-outside';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import teacherService from '@/service/teacher.service';
import studentService from '@/service/student.service';
import { log } from 'console';
import classService from '@/service/class.service';
import toast from 'react-hot-toast';


export const classSchema = Yup.object()
    .shape({
        name: Yup.string().required("Name is required"),
        students: Yup.array().min(1, "Students is required").of(
            Yup.object().shape({
                id: Yup.string().required("id is required"),
                name: Yup.string().required("name is required"),
            })),
        teachers: Yup.array().min(1, "Teachers is required").of(
            Yup.object().shape({
                id: Yup.string().required("id is required"),
                name: Yup.string().required("name is required"),
            })),
    })

const ClassPopup = () => {
    const queryClient = useQueryClient();
    const { open, setOpen, isUpdate, setIsUpdate, updateData, setUpdateData } = useClassStore(state => state);
    const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);
    const [searchTeacherInput, setSearchTeacherInput] = useState<string>('')
    const [searchStudentInput, setSearchStudentInput] = useState<string>('')

    const { register, control, handleSubmit, getValues, formState: { errors } } = useForm<any>({
        resolver: yupResolver(classSchema),
        values: {
            name: "",
            students: [],
            teachers: [],
        }
    });

    const studentsForm = useFieldArray({
        control,
        name: "students",
    });

    const teachersForm = useFieldArray({
        control,
        name: "teachers",
    });


    const teacherQuery = useQuery({
        queryKey: ['teachers', searchTeacherInput],
        queryFn: () => teacherService.searchTeacher(searchTeacherInput),
    })

    const studentQuery = useQuery({
        queryKey: ['students', searchStudentInput],
        queryFn: () => studentService.searchStudent(searchStudentInput),
    })

    const handleTeacher = (data: any) => {
        if (getValues('teachers')?.length != 0 && getValues('teachers')?.find((x: any) => x?.id == data?.id)) return;
        teachersForm.append({
            id: data?.id,
            name: data?.name,
        })
        setShowTeacherDropdown(false)
    }
    const handleStudent = (data: any) => {
        if (getValues('students')?.length != 0 && getValues('students')?.find((x: any) => x?.id == data?.id)) return;
        studentsForm.append({
            id: data?.id,
            name: data?.name,
        })
        setShowStudentDropdown(false)
    }


    const createMutation = useMutation(async (data: any) =>  await classService.createClass(data), {
        onMutate: () => {
            toast.loading("Create Class...")
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['classes']);
            toast.success("Create Class success");
            setOpen(false);
           
        },
        onError: (error: any) => {
            toast.error("Fail to create Class");
        }
    });


    const onSubmit = async (data: any) => {
        const teacher_list = data?.teachers?.map((x: any) => x?.id) || [];
        const student_list = data?.students?.map((x: any) => x?.id)|| [];

        const body = {
            name: data?.name,
            teacher_list: teacher_list,
            student_list: student_list,
        }
        createMutation.mutate(body);
    }



    return (
        <Modal show={open} dialogClassName="modal-dialog modal-dialog-centered">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content custom_mod_comp custom_hgt500">
                    <div className="custom_mod_body custom_d_flex custom_flex_col">
                        <div className="custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_p20 custom_brd_btm">
                            <label className="custom_lbl custom_fs16 custom_fw_semi_bd">Claases</label>
                            <div className="custom_d_flex custom_alg_itm_ctr">
                                <button className="custom_btn custom_btn_no_bg" type='button' onClick={() => setOpen(false)}>
                                    Cancel
                                </button>
                                <button className="custom_btn custom_btn_pm custom_ml10" type='submit'>{isUpdate ? "Update" : "Create"}</button>
                            </div>
                        </div>
                        <div className="custom_w100 custom_p25 ">
                            <div className="custom_row">
                                <div className="custom_col12 custom_pr15">
                                    <div className="custom_row">
                                        <div className="custom_col12 custom_d_flex custom_flex_col">
                                            <label className="custom_lbl custom_fw_md custom_sec_clr">
                                                Name<span className="custom_dg_clr"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="custom_inp custom_mt10"
                                                placeholder="Enter the value"
                                                maxLength={100}
                                                {...register("name")}
                                            />
                                            {
                                                <span style={{ color: "red" }}>{errors?.name?.message?.toString()}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="custom_row custom_mt35">
                                        <div className="custom_d_flex custom_flex_col">
                                            <label className="custom_lbl custom_fw_md custom_mb8 custom_sec_clr">
                                                Teacher <span className="custom_dg_clr">*</span>
                                            </label>
                                            <ClickOutside active={showTeacherDropdown} onClick={() => setShowTeacherDropdown(false)}>
                                                <div className="custom-form-tag-it-container custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_pos_rlt" >
                                                    <ul className="custom-form-tag-it-list custom_flex_no_wrap custom_scrollable" >
                                                        {
                                                            teachersForm?.fields?.map((field: any, index) => (
                                                                <>
                                                                    {
                                                                        field?.id == "" || field?.id == null ? <></>
                                                                            :
                                                                            <li className="custom-form-tag-it-list-item cursor-pointer " >
                                                                                <label className="ellipsis_text" role="button">{field?.name}</label>
                                                                                <div className="custom-remove-svg-blk" onClick={() => teachersForm.remove(index)} >
                                                                                    <svg className="custom_wth14 custom_hgt14" width={14} height={14} viewBox="0 0 24 24">
                                                                                        <path fill="#0f1fea" d="M4.81916 19.4822C4.42024 19.0926 4.42951 18.4061 4.81916 18.0257L10.5247 12.3109L4.81916 6.6053C4.42951 6.22492 4.42024 5.54768 4.81916 5.13948C5.21809 4.74055 5.89533 4.74983 6.28498 5.13948L11.9905 10.845L17.6961 5.13948C18.095 4.74983 18.7537 4.74983 19.1619 5.14875C19.5701 5.5384 19.5609 6.21565 19.1712 6.6053L13.4656 12.3109L19.1712 18.0257C19.5609 18.4154 19.5609 19.0833 19.1619 19.4822C18.763 19.8905 18.095 19.8812 17.6961 19.4915L11.9905 13.786L6.28498 19.4915C5.89533 19.8812 5.22737 19.8812 4.81916 19.4822Z" />
                                                                                    </svg>
                                                                                </div>
                                                                            </li>

                                                                    }
                                                                </>
                                                            ))
                                                        }

                                                        <li className="custom-form-tag-it-list-item-new" >
                                                            <input type="text" placeholder="Choose Teacher"
                                                                onFocus={() => setShowTeacherDropdown(true)} />
                                                        </li>
                                                    </ul>
                                                    <div className="custom-tag-it-search-container">
                                                        <svg className="custom-form-tag-it-list-search-svg" width={16} height={16} viewBox="0 0 16 16">
                                                            <path d="M1.12988 6.75244C1.12988 5.97119 1.27637 5.23633 1.56934 4.54785C1.8623 3.85938 2.27002 3.25635 2.79248 2.73877C3.31494 2.21631 3.91797 1.80615 4.60156 1.5083C5.29004 1.21045 6.02734 1.06152 6.81348 1.06152C7.59961 1.06152 8.33691 1.21045 9.02539 1.5083C9.71387 1.80615 10.3169 2.21631 10.8345 2.73877C11.3569 3.25635 11.7646 3.85938 12.0576 4.54785C12.3555 5.23633 12.5044 5.97119 12.5044 6.75244C12.5044 7.34814 12.4141 7.91699 12.2334 8.45898C12.0576 9.00098 11.811 9.49902 11.4937 9.95312L14.5552 13.022C14.6577 13.1294 14.7358 13.2515 14.7896 13.3882C14.8433 13.5249 14.8701 13.6665 14.8701 13.813C14.8701 14.0229 14.8213 14.2109 14.7236 14.377C14.626 14.5479 14.4941 14.6821 14.3281 14.7798C14.1621 14.8823 13.9717 14.9336 13.7568 14.9336C13.6104 14.9336 13.4663 14.9067 13.3247 14.853C13.188 14.8042 13.0659 14.7261 12.9585 14.6187L9.86768 11.5278C9.42822 11.8159 8.95215 12.0405 8.43945 12.2017C7.92676 12.3628 7.38477 12.4434 6.81348 12.4434C6.02734 12.4434 5.29004 12.2969 4.60156 12.0039C3.91797 11.7109 3.31494 11.3032 2.79248 10.7808C2.27002 10.2583 1.8623 9.65283 1.56934 8.96436C1.27637 8.27588 1.12988 7.53857 1.12988 6.75244ZM2.71924 6.75244C2.71924 7.31885 2.82422 7.85107 3.03418 8.34912C3.24902 8.84229 3.54443 9.27686 3.92041 9.65283C4.29639 10.0239 4.73096 10.3169 5.22412 10.5317C5.71729 10.7417 6.24707 10.8467 6.81348 10.8467C7.37988 10.8467 7.90967 10.7417 8.40283 10.5317C8.896 10.3169 9.33057 10.0239 9.70654 9.65283C10.0825 9.27686 10.3755 8.84229 10.5854 8.34912C10.8003 7.85107 10.9077 7.31885 10.9077 6.75244C10.9077 6.18604 10.8003 5.65625 10.5854 5.16309C10.3755 4.66992 10.0825 4.23535 9.70654 3.85938C9.33057 3.4834 8.896 3.19043 8.40283 2.98047C7.90967 2.77051 7.37988 2.66553 6.81348 2.66553C6.24707 2.66553 5.71729 2.77051 5.22412 2.98047C4.73096 3.19043 4.29639 3.4834 3.92041 3.85938C3.54443 4.23535 3.24902 4.66992 3.03418 5.16309C2.82422 5.65625 2.71924 6.18604 2.71924 6.75244Z" fill="#0F38EE" />
                                                        </svg>
                                                    </div>

                                                    <div className={`custom_w100 dropdown-menu custom_dropdown custom_mt5 cus_dropdown ${showTeacherDropdown && "show"} `}>
                                                        <div className="custom_d_flex custom_flex_col custom_ptb5_plr10">
                                                            <div className="custom_d_flex custom_flex_col custom_mt10 custom_hgt200 custom_scrollable">
                                                                {
                                                                    teacherQuery?.data?.teacher_lists?.map((data: any, index: any) => (
                                                                        <div className="custom_hover custom_d_flex custom_alg_itm_ctr custom_ptb5_plr10" onClick={() => handleTeacher(data)} >
                                                                            <div className="custom_circle">
                                                                                <Image
                                                                                    width={35}
                                                                                    height={35}
                                                                                    className="custom_circle"
                                                                                    src={data?.profile_image || avatar}
                                                                                    alt=''
                                                                                />
                                                                            </div>
                                                                            <div className={"d-flex flex-column "}>
                                                                                <span className="custom_lbl custom_fw_md custom_ml8">{data?.name}</span>
                                                                                <small className="custom_lbl custom_ml8 text-nowrap payer-vir-acc">{data?.phone_number}</small>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ClickOutside>
                                            {
                                                <span style={{ color: "red" }}>{errors?.teachers?.message?.toString()}</span>
                                            }

                                        </div>
                                    </div>
                                    <div className="custom_row custom_mt35">
                                        <div className="custom_col12 custom_d_flex custom_flex_col">
                                            <label className="custom_lbl custom_fw_md custom_sec_clr">
                                                Student<span className="custom_dg_clr"> *</span>
                                            </label>
                                            <ClickOutside active={showStudentDropdown} onClick={() => setShowStudentDropdown(false)}>
                                                <div className="custom-form-tag-it-container custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_pos_rlt" >
                                                    <ul className="custom-form-tag-it-list custom_flex_no_wrap custom_scrollable" >
                                                        {
                                                            studentsForm?.fields?.map((field: any, index) => (
                                                                <>
                                                                    {
                                                                        field?.id == "" || field?.id == null ? <></>
                                                                            :
                                                                            <li className="custom-form-tag-it-list-item cursor-pointer " >
                                                                                <label className="ellipsis_text" role="button">{field?.name}</label>
                                                                                <div className="custom-remove-svg-blk" onClick={() => teachersForm.remove(index)} >
                                                                                    <svg className="custom_wth14 custom_hgt14" width={14} height={14} viewBox="0 0 24 24">
                                                                                        <path fill="#0f1fea" d="M4.81916 19.4822C4.42024 19.0926 4.42951 18.4061 4.81916 18.0257L10.5247 12.3109L4.81916 6.6053C4.42951 6.22492 4.42024 5.54768 4.81916 5.13948C5.21809 4.74055 5.89533 4.74983 6.28498 5.13948L11.9905 10.845L17.6961 5.13948C18.095 4.74983 18.7537 4.74983 19.1619 5.14875C19.5701 5.5384 19.5609 6.21565 19.1712 6.6053L13.4656 12.3109L19.1712 18.0257C19.5609 18.4154 19.5609 19.0833 19.1619 19.4822C18.763 19.8905 18.095 19.8812 17.6961 19.4915L11.9905 13.786L6.28498 19.4915C5.89533 19.8812 5.22737 19.8812 4.81916 19.4822Z" />
                                                                                    </svg>
                                                                                </div>
                                                                            </li>

                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                        <li className="custom-form-tag-it-list-item-new" >
                                                            <input type="text" placeholder="Choose Student"
                                                                onFocus={() => setShowStudentDropdown(true)} />
                                                        </li>
                                                    </ul>
                                                    <div className="custom-tag-it-search-container">
                                                        <svg className="custom-form-tag-it-list-search-svg" width={16} height={16} viewBox="0 0 16 16">
                                                            <path d="M1.12988 6.75244C1.12988 5.97119 1.27637 5.23633 1.56934 4.54785C1.8623 3.85938 2.27002 3.25635 2.79248 2.73877C3.31494 2.21631 3.91797 1.80615 4.60156 1.5083C5.29004 1.21045 6.02734 1.06152 6.81348 1.06152C7.59961 1.06152 8.33691 1.21045 9.02539 1.5083C9.71387 1.80615 10.3169 2.21631 10.8345 2.73877C11.3569 3.25635 11.7646 3.85938 12.0576 4.54785C12.3555 5.23633 12.5044 5.97119 12.5044 6.75244C12.5044 7.34814 12.4141 7.91699 12.2334 8.45898C12.0576 9.00098 11.811 9.49902 11.4937 9.95312L14.5552 13.022C14.6577 13.1294 14.7358 13.2515 14.7896 13.3882C14.8433 13.5249 14.8701 13.6665 14.8701 13.813C14.8701 14.0229 14.8213 14.2109 14.7236 14.377C14.626 14.5479 14.4941 14.6821 14.3281 14.7798C14.1621 14.8823 13.9717 14.9336 13.7568 14.9336C13.6104 14.9336 13.4663 14.9067 13.3247 14.853C13.188 14.8042 13.0659 14.7261 12.9585 14.6187L9.86768 11.5278C9.42822 11.8159 8.95215 12.0405 8.43945 12.2017C7.92676 12.3628 7.38477 12.4434 6.81348 12.4434C6.02734 12.4434 5.29004 12.2969 4.60156 12.0039C3.91797 11.7109 3.31494 11.3032 2.79248 10.7808C2.27002 10.2583 1.8623 9.65283 1.56934 8.96436C1.27637 8.27588 1.12988 7.53857 1.12988 6.75244ZM2.71924 6.75244C2.71924 7.31885 2.82422 7.85107 3.03418 8.34912C3.24902 8.84229 3.54443 9.27686 3.92041 9.65283C4.29639 10.0239 4.73096 10.3169 5.22412 10.5317C5.71729 10.7417 6.24707 10.8467 6.81348 10.8467C7.37988 10.8467 7.90967 10.7417 8.40283 10.5317C8.896 10.3169 9.33057 10.0239 9.70654 9.65283C10.0825 9.27686 10.3755 8.84229 10.5854 8.34912C10.8003 7.85107 10.9077 7.31885 10.9077 6.75244C10.9077 6.18604 10.8003 5.65625 10.5854 5.16309C10.3755 4.66992 10.0825 4.23535 9.70654 3.85938C9.33057 3.4834 8.896 3.19043 8.40283 2.98047C7.90967 2.77051 7.37988 2.66553 6.81348 2.66553C6.24707 2.66553 5.71729 2.77051 5.22412 2.98047C4.73096 3.19043 4.29639 3.4834 3.92041 3.85938C3.54443 4.23535 3.24902 4.66992 3.03418 5.16309C2.82422 5.65625 2.71924 6.18604 2.71924 6.75244Z" fill="#0F38EE" />
                                                        </svg>
                                                    </div>

                                                    <div className={`custom_w100 dropdown-menu custom_dropdown custom_mt5 cus_dropdown z_index ${showStudentDropdown && "show"} `}>
                                                        <div className="custom_d_flex custom_flex_col custom_ptb5_plr10">
                                                            <div className="custom_d_flex custom_flex_col custom_mt10 custom_hgt200 custom_scrollable">
                                                                {
                                                                    studentQuery?.data?.student_list?.map((data: any, index: any) => (
                                                                        <div className="custom_hover custom_d_flex custom_alg_itm_ctr custom_ptb5_plr10" onClick={() => handleStudent(data)}>
                                                                            <div className="custom_circle">
                                                                                <Image
                                                                                    width={35}
                                                                                    height={35}
                                                                                    className="custom_circle"
                                                                                    src={data?.profile_image || avatar}
                                                                                    alt=''
                                                                                />
                                                                            </div>
                                                                            <div className={"d-flex flex-column "}>
                                                                                <span className="custom_lbl custom_fw_md custom_ml8">{data?.name}</span>
                                                                                <small className="custom_lbl custom_ml8 text-nowrap payer-vir-acc">{data?.phone_number}</small>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ClickOutside>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default ClassPopup