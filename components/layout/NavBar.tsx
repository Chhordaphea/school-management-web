import Image from 'next/image';
import avatar from 'public/asset/user/avatar.svg'
import DropdownProfile from './DropdownProfile';
import useFetchProfile from '@/lib/hooks/use-fetch-profile-account';
function NavBar() {
    const { profileQuery, isError, isLoading } = useFetchProfile();

    if (isError) return <div>error</div>;
    if (isLoading) return <div></div>;

    return (
        <>
        <div className="custom_d_flex custom_jt_cont_betw custom_alg_itm_ctr custom_ptb12_plr25">
            <div className="custom_d_flex custom_alg_itm_ctr">
            </div>
            <div className="custom_d_flex custom_alg_itm_ctr custom_gap_25">   
                <div className="custom_wth36 custom_hgt36 custom_cs_pointer" data-bs-toggle="dropdown" >
                    <Image className="custom_img " src={profileQuery?.data?.profile_picture || avatar}  width={36} height={36} priority  alt=""/>
                </div>
                <DropdownProfile />
            </div>
        </div> 
    </>
    );
}

export default NavBar;

