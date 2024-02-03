import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, } from 'react-hook-form';
import * as Yup from 'yup';
import ErrorMessage from '../common/ErrorMessage';
import CameraSvg from '../icon/CameraSvg';
import Image from 'next/image';
import toast from 'react-hot-toast';
import profileService from '@/service/profile.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const ProfileContainer = ({ show, close, accountData }: { accountData: any, show: any, close: () => void }) => {

  const schema = Yup.object()
    .shape({
      fullname: Yup.string().required("Full name is required"),
      gender: Yup.string().required("Gender is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    })

  const [previewImage, setPreviewImage] = useState<string | null>(accountData?.profile_picture || null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [fileImage, setFileImage] = useState<File | null>(null);
  const queryClient = useQueryClient();

  type requestType = Yup.InferType<typeof schema>
  const { register, handleSubmit, formState: { errors } } = useForm<requestType>({
    resolver: yupResolver(schema),
    values: {
      fullname: accountData?.name || "",
      gender: accountData?.gender || "",
      phoneNumber: accountData?.phone_number || "",
      email: accountData?.email || "",
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

  const updateMutation = useMutation((data: any) => profileService.updateAccountProfile(data), {
    onMutate: () => {
      toast.loading("Update Account...")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      toast.success("Update Account success");
    },
    onError: (error: any) => {
      toast.error("Fail to update Account");
    }
  });


  const onSubmit = async (data: any) => {
    let profileImage = null;
    if (fileImage != null) {
      try {
        const fileResponse = await profileService.uploadImage(fileImage);
        profileImage = fileResponse?.data?.data?.image_url;
      } catch (error) {
        toast.error("Fail to upload profile");
        return;
      }
    }
    const reqBody = {
      fullname: data.fullname,
      email: data.email,
      phonenumber: data.phoneNumber,
      gender: data?.gender,
      profile_image: profileImage
    };

    updateMutation.mutate(reqBody);

  }



  return (
    <Modal show={show} dialogClassName="modal-dialog modal-dialog-centered custom_mxwth900">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-content custom_mod_comp ">
          <div className="custom_mod_body custom_d_flex custom_flex_col">
            <div className="custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_p10 custom_brd_btm">
              <label className="custom_lbl custom_fs16 custom_fw_semi_bd">Account Information</label>
              <div className="custom_d_flex custom_alg_itm_ctr">
                <button className="custom_btn custom_btn_no_bg" type='button' onClick={close}>
                  Cancel
                </button>
                <button className="custom_btn custom_btn_pm custom_ml10" type='submit'>Edit</button>
              </div>
            </div>
            <div className="custom_w100 custom_p25">
              <div className="custom_row">
                <div className="custom_col12 custom_pr15">
                  <div className="custom_row ">
                    <div className="custom_col12">
                      <div className=" custom_d_flex custom_jt_cont_ctr">
                        <div className="custom_wth120 custom_hgt120 custom_div_blk custom_brd custom_d_flex custom_jt_cont_ctr custom_alg_itm_ctr" onClick={handleClickUploadImage}>
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
                  <div className="custom_row custom_mt30">
                    <div className="custom_col6 custom_d_flex custom_flex_col">
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
                    <div className="custom_col6 custom_d_flex custom_flex_col">
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
                    <div className="custom_col6 custom_d_flex custom_flex_col">
                      <label className="custom_lbl custom_fw_md custom_sec_clr">
                        Email <span className="custom_dg_clr"> *</span>
                      </label>
                      <input
                        type="text"
                        className="custom_inp custom_mt10"
                        placeholder="Enter the value"
                        maxLength={100}
                        {...register("email")}
                      />
                    </div>
                    <div className="custom_col6 custom_d_flex custom_flex_col">
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
                </div>
                {/* <div className="custom_col4">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>

    </Modal>
  )
}

export default ProfileContainer