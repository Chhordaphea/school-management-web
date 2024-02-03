import CameraSvg from '@/components/icon/CameraSvg';
import { useResetRowSelectStore, useTeacherStore } from '@/lib/store';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, } from 'react-hook-form';
import { studentSchema } from '@/utils/student.schema';
import * as Yup from 'yup';
import ErrorMessage from '@/components/common/ErrorMessage';
import profileService from '@/service/profile.service';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import teacherService from '@/service/teacher.service';

const CreateTeacher = () => {
    const { open, setOpen, isUpdate, setIsUpdate, updateData, setUpdateData } = useTeacherStore(state => state);
    const [previewImage, setPreviewImage] = useState<string | null>(updateData?.profile_image || null);
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [fileImage, setFileImage] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const {setRow,resetRow} = useResetRowSelectStore(state => state);

    type requestType = Yup.InferType<typeof studentSchema>
    const { register, handleSubmit,formState: { errors } } = useForm<requestType>({
            resolver: yupResolver(studentSchema),
            values: {
                fullname: "" || updateData?.name,
                gender: "" || updateData?.gender,
                address: "" || updateData?.address,
                phoneNumber: "" || updateData?.phone_number,
                email: "" || updateData?.email,
            }
        });


    //hanlde click to upload image
    const handleClickUploadImage = () => {
        hiddenFileInput?.current?.click();
    };

    //hanlde change image
    const handleUploadImageChange = async (e: any) => {
        const file = e.target.files[0];
        setFileImage(file);
        setPreviewImage(URL?.createObjectURL(e?.target?.files[0]));
    };


    const createMutation = useMutation((data: any) => teacherService.createTeacher(data), {
        onMutate: () => {
            toast.loading("Create Teacher...")
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['teachers']);
            toast.success("Create Teacher success");
            setOpen(false);
        },
        onError: () => {
            toast.error("Fail to create teacher");
        }
    });

    const updateMutation = useMutation((data: any) => teacherService.updateTeacher(data,updateData?.id), {
        onMutate: () => {
            toast.loading("Update Teacher...")
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['teachers']);
            toast.success("Update Teacher success");
            setOpen(false);
            resetRow(true)
            
        },
        onError: () => {
            toast.error("Fail to update teacher");
        }
    });


    //hanlde submit
    const onSubmit = async (data: any) => {
        let profile_image = null;
        if (fileImage != null) {
            try {
                const fileResponse = await profileService.uploadImage(fileImage);
                profile_image = fileResponse.data.data.image_url;
            } catch (error) {
                toast.error("Fail to upload profile");
                return;
            }
        }
        const body = {
            "name": data.fullname,
            "gender": data?.gender,
            "address": data?.address,
            "phone_number": data?.phoneNumber,
            "email": data?.email,
            "profile_image": profile_image,
        }
        if(isUpdate){
            updateMutation.mutate(body);
            return;
        }
        createMutation.mutate(body);
    }

    return (
        <Modal show={open} dialogClassName="modal-dialog modal-dialog-centered">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content custom_mod_comp">
                    <div className="custom_mod_body custom_d_flex custom_flex_col">
                        <div className="custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_p20 custom_brd_btm">
                            <label className="custom_lbl custom_fs16 custom_fw_semi_bd">{isUpdate ? "Update Teacher" : "New Teacher"}</label>
                            <div className="custom_d_flex custom_alg_itm_ctr">
                                <button className="custom_btn custom_btn_no_bg" type='button' onClick={() => setOpen(false)}>
                                    Cancel
                                </button>
                                <button className="custom_btn custom_btn_pm custom_ml10" type='submit'>{isUpdate ? "Update" : "Create"}</button>
                            </div>
                        </div>
                        <div className="custom_w100 custom_p25">
                            <div className="custom_row">
                                <div className="custom_col8 custom_pr15">
                                    <div className="custom_row">
                                        <div className="custom_col12 custom_d_flex custom_flex_col">
                                            <label className="custom_lbl custom_fw_md custom_sec_clr">
                                                Full Name<span className="custom_dg_clr"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="custom_inp custom_mt10"
                                                placeholder="Enter the value"
                                                maxLength={100}
                                                {...register("fullname")}
                                            />
                                            <ErrorMessage message={errors?.fullname?.message!} />
                                        </div>
                                    </div>
                                    <div className="custom_row custom_mt15">
                                        <div className="custom_col12 custom_d_flex custom_flex_col">
                                            <label className="custom_lbl custom_fw_md custom_sec_clr">
                                                Gender<span className="custom_dg_clr"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="custom_inp custom_mt10"
                                                placeholder="Enter the value"
                                                maxLength={100}
                                                {...register("gender")}
                                            />
                                            <ErrorMessage message={errors.gender?.message!} />
                                        </div>
                                    </div>
                                    <div className="custom_row custom_mt15">
                                        <div className="custom_col12 custom_d_flex custom_flex_col">
                                            <label className="custom_lbl custom_fw_md custom_sec_clr">
                                                Address<span className="custom_dg_clr"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="custom_inp custom_mt10"
                                                placeholder="Enter the value"
                                                maxLength={100}
                                                {...register("address")}
                                            />
                                            <ErrorMessage message={errors?.address?.message!} />
                                        </div>
                                    </div>
                                    <div className="custom_row custom_mt15">
                                        <div className="custom_col12 custom_d_flex custom_flex_col">
                                            <label className="custom_lbl custom_fw_md custom_sec_clr">
                                                Phone Number<span className="custom_dg_clr"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="custom_inp custom_mt10"
                                                placeholder="Enter the value"
                                                maxLength={100}
                                                {...register("phoneNumber")}
                                            />
                                            <ErrorMessage message={errors?.phoneNumber?.message!} />
                                        </div>
                                    </div>
                                    <div className="custom_row custom_mt15">
                                        <div className="custom_col12 custom_d_flex custom_flex_col">
                                            <label className="custom_lbl custom_fw_md custom_sec_clr">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                className="custom_inp custom_mt10"
                                                placeholder="Enter the value"
                                                maxLength={100}
                                                {...register("email")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom_col4">
                                    <div className="custom_mt35 custom_d_flex custom_jt_cont_end" onClick={handleClickUploadImage}>
                                        <div className="custom_wth120 custom_hgt120 custom_div_blk custom_brd custom_d_flex custom_jt_cont_ctr custom_alg_itm_ctr">
                                            {previewImage ? <Image
                                                className="custom_wth120  custom_hgt120 custom_div_blk custom_alg_itm_ctr"
                                                src={previewImage ? previewImage : "./asset/user/avatar.svg"}
                                                width={80}
                                                height={80}
                                                alt=""
                                            /> : <CameraSvg />}
                                            <input
                                                className=""
                                                type="file"
                                                id="input-file-upload"
                                                hidden
                                                ref={hiddenFileInput}
                                                onChange={handleUploadImageChange}
                                            />
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

export default CreateTeacher