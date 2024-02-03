import { AuthRequest } from "@/lib/types/auth";
import { http } from "@/utils/http";

const ServiceId = {
    LOGIN: '/api/bo/v1/auth/login',
}

const login = (data: AuthRequest) => {
    return http.post(ServiceId.LOGIN, data);
}


export const authService = {
    login,
}

export default authService;