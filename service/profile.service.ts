import { ProfileAccount } from "@/lib/types/profile";
import { http } from "@/utils/http";

const ServiceId = {
    PROFILE: '/api/bo/v1/profile',
    UPLOADIMAGE : '/api/bo/v1/files/upload-image'
}

function getAccountProfile(): Promise<ProfileAccount> {
    return http.get(ServiceId.PROFILE).then(res => res?.data?.data).catch(error => error);
}
function updateAccountProfile(requestBody: any) {
    const API = ServiceId.PROFILE;
    return http.patch(API,requestBody)
}

function uploadImage(image: File) {
    const formData = new FormData();
    formData.append("file_data", image)
    const API = ServiceId.UPLOADIMAGE;
    return http.post(API,formData)
}

export const profileService = {
    getAccountProfile,
    uploadImage,
    updateAccountProfile
}

export default profileService;

