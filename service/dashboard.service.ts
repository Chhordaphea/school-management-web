import { http } from "@/utils/http";

const ServiceId = {
    DATA: '/api/bo/v1/summary',
}

const getDashboardData = () => {
    return http.get(ServiceId.DATA).then(res => res.data?.data);
}

export const dashboardService = {
    getDashboardData,
}

export default dashboardService;