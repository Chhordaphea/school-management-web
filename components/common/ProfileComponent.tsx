import Image from "next/image";
import avatar from 'public/asset/user/avatar.svg'

type Props = {
    name: string,
    image: string,
}

const ProfileComponent: React.FC<Props> = ({image, name}) =>{

    return (
        <div className="custom_d_flex custom_alg_itm_ctr">
            <div className="custom_circle custom_wth32 custom_hgt32">
                <Image className="custom_img" src={image || avatar}  alt="payer_profile" height={32} width={32}/>
            </div>
            <span className="custom_lbl custom_fw_md custom_ml8">{name}</span>
        </div>
    )
}

export default ProfileComponent;