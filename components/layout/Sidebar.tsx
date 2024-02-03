import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function Sidebar() {
  const [showLogo, setShowLogo] = useState(true);
  const router = useRouter();

  return (
    <div className="custom_d_flex custom_flex_col custom_sb_resp">
      <div id="custom_sb_logo_id" className="custom_d_flex custom_alg_itm_ctr custom_ptb20_plr25 custom_mb10">
        <a rel="prefetch">
          <div className="custom_d_flex custom_alg_itm_ctr custom_cs_pointer">
           
            {showLogo && <Image className="custom_wb_logo_svg custom_ml25 custom_mt5" src="/asset/logo/school_logo.png" width={100} height={70} priority alt="" />}
          </div>
        </a>
      </div>
      <div className="custom_d_flex custom_flex_col custom_plr15 custom_hide_x_scroll custom_scrollable">
        <Link className="text-decoration-none" href={"/"}>
          <div className={`custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_sb_itm custom_mb5 ${router?.asPath == "/" && "cur_act"}`}>
            <div className="custom_d_flex custom_alg_itm_ctr">
              <Image className="custom_wb_logo_svg" src="/asset/logo/apps.png" width={17} height={17} priority alt="" />
              <label className="custom_lbl custom_fw_md custom_ml10 text_withe cursor_pointer">Dashboard</label>
            </div>
          </div>
        </Link>

        <Link className="text-decoration-none" href={"/students"}>
          <div className={`custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_sb_itm custom_mb5 ${router?.asPath?.startsWith("/students") && "cur_act"}`}>
            <div className="custom_d_flex custom_alg_itm_ctr">
              <Image className="custom_wb_logo_svg" src="/asset/logo/student.png" width={24} height={24} priority alt="" />
              <label className="custom_lbl custom_fw_md custom_ml10 text_withe cursor_pointer">Students</label>
            </div>
          </div>
        </Link>
        <Link className="text-decoration-none" href={"/teachers"}>
          <div className={`custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_sb_itm custom_mb5 ${router?.asPath?.startsWith("/teachers") && "cur_act"}`}>
            <div className="custom_d_flex custom_alg_itm_ctr">
              <Image className="custom_wb_logo_svg" src="/asset/logo/teacher.png" width={24} height={24} priority alt="" />
              <label className="custom_lbl custom_fw_md custom_ml10 text_withe cursor_pointer">Teachers</label>
            </div>
          </div>
        </Link>
        <Link className="text-decoration-none" href={"/classes"}>
          <div className={`custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_sb_itm custom_mb5 ${router?.asPath?.startsWith("/classes") && "cur_act"}`}>
            <div className="custom_d_flex custom_alg_itm_ctr">
              <Image className="custom_wb_logo_svg" src="/asset/logo/class.png" width={24} height={24} priority alt="" />
              <label className="custom_lbl custom_fw_md custom_ml10 text_withe cursor_pointer">Classes</label>
            </div>
          </div>
        </Link>
      </div>
    </div>

  )
}

export default Sidebar