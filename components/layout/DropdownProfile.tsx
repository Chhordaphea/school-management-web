import React, { useEffect, useState } from 'react';
import { signOut } from "next-auth/react";
import Image from 'next/image';
import avatar from 'public/asset/user/avatar.svg'
import useFetchProfile from '@/lib/hooks/use-fetch-profile-account';
import ProfileContainer from './ProfileContainer';

function DropdownProfile() {
    const { profileQuery,isError, isLoading } = useFetchProfile();
    const [showProfile, setShowProfile] = useState(false);

    if (isError) return <span>error</span>;
    if (isLoading) return <span></span>;

    const handleLogout = () => {
        if (confirm("Do you really want to Logout?")) {
            signOut();
        }
    }

    return (
        <>
            <div className="dropdown-menu custom_dropdown dropdown-menu-end custom_mt5 custom_sb_bg_clr" >
                <div className="custom_d_flex custom_flex_col custom_wth280">
                    <div className="custom_d_flex custom_flex_col custom_p10">
                        <div className="custom_d_flex custom_flex_row custom_alg_itm_ctr custom_p10">
                            <div className="custom_wth45 custom_hgt45 bg_withe">
                                <Image
                                className="custom_img profile_user"
                                src={profileQuery?.data?.profile_picture || avatar }
                                width={40}
                                height={38}
                                alt=""
                                />
                            </div>
                            <div className="custom_d_flex custom_flex_col custom_ml10">
                            <label className="custom_lbl custom_fs16 custom_fw_md text_withe">
                            {profileQuery?.data?.name}
                            </label>
                            <label className="custom_lbl custom_fs12 custom_fw_md  custom_mt2 text_withe">
                            {profileQuery?.data?.username}
                            </label>
                            </div>
                        </div>
                        
                    </div>
                    <div className="custom_d_flex custom_alg_itm_ctr custom_ptb15_plr20 custom_drp_itm custom_brd_top c_pointer" onClick={() => setShowProfile(!showProfile)}>
                    <svg viewBox="0 0 24 24"  className="custom_wth20 custom_hgt20 custom_sec_fill_clr custom_mr10">
                        <g id="_01_align_center" data-name="01 align center"><path d="M15,24H9V20.487a9,9,0,0,1-2.849-1.646L3.107,20.6l-3-5.2L3.15,13.645a9.1,9.1,0,0,1,0-3.29L.107,8.6l3-5.2L6.151,5.159A9,9,0,0,1,9,3.513V0h6V3.513a9,9,0,0,1,2.849,1.646L20.893,3.4l3,5.2L20.85,10.355a9.1,9.1,0,0,1,0,3.29L23.893,15.4l-3,5.2-3.044-1.758A9,9,0,0,1,15,20.487Zm-4-2h2V18.973l.751-.194A6.984,6.984,0,0,0,16.994,16.9l.543-.553,2.623,1.515,1-1.732-2.62-1.513.206-.746a7.048,7.048,0,0,0,0-3.75l-.206-.746,2.62-1.513-1-1.732L17.537,7.649,16.994,7.1a6.984,6.984,0,0,0-3.243-1.875L13,5.027V2H11V5.027l-.751.194A6.984,6.984,0,0,0,7.006,7.1l-.543.553L3.84,6.134l-1,1.732L5.46,9.379l-.206.746a7.048,7.048,0,0,0,0,3.75l.206.746L2.84,16.134l1,1.732,2.623-1.515.543.553a6.984,6.984,0,0,0,3.243,1.875l.751.194Zm1-6a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"/></g></svg>
                        <label role={'button'} className="custom_lbl custom_fw_md text_withe">{"Setting"}</label>
                    </div>
                    <div className="custom_d_flex custom_alg_itm_ctr custom_ptb15_plr20 custom_drp_itm custom_brd_top c_pointer"  onClick={handleLogout}>
                    <svg  viewBox="0 0 24 24" className="custom_wth20 custom_hgt20 custom_sec_fill_clr custom_mr10">
                        <path d="M11.5,16A1.5,1.5,0,0,0,10,17.5v.8A2.7,2.7,0,0,1,7.3,21H5.7A2.7,2.7,0,0,1,3,18.3V5.7A2.7,2.7,0,0,1,5.7,3H7.3A2.7,2.7,0,0,1,10,5.7v.8a1.5,1.5,0,0,0,3,0V5.7A5.706,5.706,0,0,0,7.3,0H5.7A5.706,5.706,0,0,0,0,5.7V18.3A5.706,5.706,0,0,0,5.7,24H7.3A5.706,5.706,0,0,0,13,18.3v-.8A1.5,1.5,0,0,0,11.5,16Z"/><path d="M22.561,9.525,17.975,4.939a1.5,1.5,0,0,0-2.121,2.122l3.411,3.411L7,10.5a1.5,1.5,0,0,0,0,3H7l12.318-.028-3.467,3.467a1.5,1.5,0,0,0,2.121,2.122l4.586-4.586A3.505,3.505,0,0,0,22.561,9.525Z"/></svg>
                        <label role={'button'} className="custom_lbl custom_fw_md text_withe" >{"Logout"}</label>
                    </div>
                </div>
            </div>
            {
                showProfile && (<ProfileContainer accountData={profileQuery?.data} show={showProfile} close={() => setShowProfile(false)} />)
            }
        </>

    );
}

export default DropdownProfile;