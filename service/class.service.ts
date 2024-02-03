import { http } from "@/utils/http";

const ServiceId = {
    CLASSS: '/api/bo/v1/classes'
}

function getClasses(param: any){
    return http.get(ServiceId.CLASSS, { params: { ...param }}).then(res => res?.data?.data);
}
async function createClass(reqBody: any) {
    return await http.post(ServiceId.CLASSS,reqBody);
}

function getTeacherClass(id: any){
    return http.get(ServiceId.CLASSS + `/${id}/teachers`).then(res => res?.data?.data).catch(err => err);
}

function getStudentClass(id: any){
    return http.get(ServiceId.CLASSS + `/${id}/students`).then(res => res?.data?.data).catch(err => err);
}


export const classService = {
    getClasses,
    createClass,
    getTeacherClass,
    getStudentClass
}

export default classService;

