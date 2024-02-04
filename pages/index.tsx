import dashboardService from '@/service/dashboard.service';
import {useQuery } from '@tanstack/react-query'
import React from 'react'

const HomePage = () => {
  const dashboardData = useQuery({ queryKey: ['dashboard'], queryFn: async () => await dashboardService.getDashboardData()});

  return (
    <>
      <div className="custom_plr30 custom_mt25">
        <div className="custom_row custom_mt20">
          <div className="custom_col4">
            <div className="custom_div_blk custom_bd_rad10 custom_d_flex custom_jt_cont_betw custom_alg_itm_start custom_sb_bg_clr custom_p20">
              <div className="custom_d_flex custom_flex_col">
                <label className="custom_lbl custom_fw_md text_withe">Total Teachers</label>
                <label className="custom_lbl custom_fs21 custom_fw_md text_withe">{dashboardData?.data?.total_teacher}</label>
              </div>
            </div>
          </div>
          <div className="custom_col4">
            <div className="custom_div_blk custom_bd_rad10 custom_d_flex custom_jt_cont_betw custom_alg_itm_start custom_sb_bg_clr custom_p20">
              <div className="custom_d_flex custom_flex_col">
                <label className="custom_lbl custom_fw_md text_withe">Total Students</label>
                <label className="custom_lbl custom_fs21 custom_fw_md text_withe">{dashboardData?.data?.total_student}</label>
              </div>
            </div>
          </div>
          <div className="custom_col4">
            <div className="custom_div_blk custom_bd_rad10 custom_d_flex custom_jt_cont_betw custom_alg_itm_start custom_sb_bg_clr custom_p20">
              <div className="custom_d_flex custom_flex_col">
                <label className="custom_lbl custom_fw_md text_withe">Total Class</label>
                <label className="custom_lbl custom_fs21 custom_fw_md text_withe">{dashboardData?.data?.total_class}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage