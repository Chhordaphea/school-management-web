import { http } from "@/utils/http";

const ServiceId = {
    TEACHER: '/api/bo/v1/teachers'
}

function getTeacherList(param: any){
    return http.get(ServiceId.TEACHER, { params: { ...param } }).then(res => res?.data?.data);
}

function searchTeacher(param: any){
    return http.get(ServiceId.TEACHER, { params: { search_value: param } }).then(res => res?.data?.data);
}



async function createTeacher(reqBody: any) {
    return await http.post(ServiceId.TEACHER,reqBody).catch(err => err);
}

async function deleteTeachers(reqBody: any) {
    return await http.delete(ServiceId.TEACHER, { data: { teacher_ids: reqBody } });
}

async function updateTeacher(reqBody: any,id: any) {
    return await http.patch(ServiceId.TEACHER + `/${id}`, reqBody);
}

export const teacherService = {
    getTeacherList,
    createTeacher,
    deleteTeachers,
    updateTeacher,
    searchTeacher
}

export default teacherService;

